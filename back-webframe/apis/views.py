from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.http import JsonResponse
from django.utils import timezone
from django.db import transaction
from .models import Person, Fridge, Ingredient, Like, Recipe, Allergy, PersonAllergy, Shopping

# REST API용 import
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

# GPT 관련 import
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
import os, base64, mimetypes


# ------------------------------
# GPT 초기화
# ------------------------------
llm_consistent = None
try:
    api_key = os.environ.get("OPENAI_API_KEY")
    if api_key:
        llm_consistent = ChatOpenAI(
            model='gpt-4o',
            temperature=0,
            max_tokens=1000,
            top_p=0.3,
            frequency_penalty=0.1,
        )
    else:
        print("⚠️ OPENAI_API_KEY가 설정되지 않아 ChatOpenAI를 비활성화합니다.")
except Exception as e:
    print(f"⚠️ ChatOpenAI 초기화 실패: {e}")


# ------------------------------
# GPT 이미지 분석 뷰
# ------------------------------
def classify_query_view(request):
    uploaded_file = request.FILES.get("image")
    base64_image_data = None
    media_type = "image/jpeg"

    if uploaded_file:
        try:
            media_type = uploaded_file.content_type or "image/jpeg"
            base64_image_data = base64.b64encode(uploaded_file.read()).decode("utf-8")
        except Exception:
            return JsonResponse({"detail": "failed to read uploaded file"}, status=400, safe=False)

    else:
        user_input = (request.POST.get("query") or request.GET.get("query") or "").strip()
        if not user_input:
            try:
                user_input = request.body.decode("utf-8").strip()
            except Exception:
                user_input = ""

        if not user_input:
            return JsonResponse({"detail": "empty query"}, status=400, safe=False)

        if user_input.lower().startswith(("http://", "https://")):
            return JsonResponse({"detail": "URL 입력은 지원하지 않습니다."}, status=400, safe=False)
        else:
            if not os.path.exists(user_input):
                return JsonResponse({"detail": f"file not found: {user_input}"}, status=400, safe=False)
            try:
                with open(user_input, "rb") as f:
                    base64_image_data = base64.b64encode(f.read()).decode("utf-8")
                media_type = mimetypes.guess_type(user_input)[0] or "image/jpeg"
            except Exception:
                return JsonResponse({"detail": "failed to read image path"}, status=400, safe=False)

    image_data_uri = f"data:{media_type};base64,{base64_image_data}"

    system_prompt = """
    [역할]
    당신은 냉장고 이미지 속 재료를 식별하고, 아래의 '재료 목록'과 '수량 판별 규칙'에 따라 각 항목의 정확한 수량을 판별하는 전문 분석가입니다.
    """

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=[{"type": "image_url", "image_url": {"url": image_data_uri}}])
    ]

    response = llm_consistent.invoke(messages)
    food_list = response.content
    return JsonResponse(food_list, safe=False)


# ------------------------------
# 냉장고 관련 기능
# ------------------------------
def my_fridge(request):
    person = Person.objects.get(user_id='minjae01')  # 로그인 기능 적용 전까지는 고정 사용자
    fridge_items = Fridge.objects.filter(person=person)
    liked_recipes = Recipe.objects.filter(like__person=person)

    return render(request, 'fridge_app/my_fridge.html', {
        'person': person,
        'fridge_items': fridge_items,
        'liked_recipes': liked_recipes
    })


@api_view(['GET'])
@csrf_exempt
def ingredient_list_api(request):
    try:
        ingredients = Ingredient.objects.all()
        data = [
            {
                "ingredient_id": ing.ingredient_id,
                "name": ing.ingredient_name,
                "img": ing.ingredient_img,
                "unit": ing.unit,
                "category": ing.ingredient_category,
                "price": float(ing.price),
                "shelf_life": ing.shelf_life
            }
            for ing in ingredients
        ]
        return JsonResponse({"ingredients": data}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


def add_ingredient(request):
    if request.method == 'POST':
        user_id = 'minjae01'  # 로그인 연동 시 변경
        ingredient_name = request.POST['ingredient']
        quantity = request.POST['quantity']
        added_date = request.POST['added_date']  # 🔥 exdate → added_date

        person = Person.objects.get(user_id=user_id)
        ingredient = Ingredient.objects.get(ingredient_name=ingredient_name)

        Fridge.objects.create(
            person=person,
            ingredient=ingredient,
            f_quantity=quantity,
            added_date=added_date   # 🔥 expiry_date는 save()에서 자동 계산됨
        )
    return redirect('my_fridge')


@api_view(['DELETE'])
@csrf_exempt
def delete_ingredient(request, fridge_id):
    try:
        item = get_object_or_404(Fridge, pk=fridge_id)
        item.delete()
        return JsonResponse({"message": "재료가 성공적으로 삭제되었습니다."}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@api_view(['PUT'])
@csrf_exempt
def update_fridge_item(request, fridge_id):
    try:
        item = get_object_or_404(Fridge, pk=fridge_id)
        
        new_quantity = request.data.get('quantity')
        
        if new_quantity is None:
            return JsonResponse({"error": "수량을 입력해주세요."}, status=400)
        
        item.f_quantity = new_quantity
        item.save()
        
        # 업데이트된 데이터를 다시 프론트엔드로 보내줍니다.
        updated_data = {
            "fridge_id": item.fridge_id,
            "ingredient": item.ingredient.ingredient_name,
            "quantity": float(item.f_quantity),
            "unit": item.ingredient.unit,
            "category": item.ingredient.ingredient_category,
            "added_date": item.added_date.strftime("%Y-%m-%d"),
            "expiry_date": item.expiry_date.strftime("%Y-%m-%d")
        }
        
        return JsonResponse(updated_data, status=200)

    except Fridge.DoesNotExist:
        return JsonResponse({"error": "해당 재료를 찾을 수 없습니다."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)



def toggle_like(request, recipe_id):
    person = Person.objects.get(user_id='minjae01')
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    existing = Like.objects.filter(person=person, recipe=recipe)

    if existing.exists():
        existing.delete()
    else:
        Like.objects.create(person=person, recipe=recipe)
    return redirect('my_fridge')


@api_view(['POST'])
@csrf_exempt
@transaction.atomic # 모든 작업이 성공하거나, 하나라도 실패하면 모두 롤백
def create_shopping_records_api(request):
    try:
        user_id = request.data.get('user_id')
        cart_items = request.data.get('items')

        if not user_id or not cart_items:
            return JsonResponse({"error": "사용자 ID와 장바구니 항목이 필요합니다."}, status=400)

        person = Person.objects.get(user_id=user_id)

        for item_data in cart_items:
            ingredient_id = item_data.get('ingredient_id')
            quantity = item_data.get('quantity')
            
            ingredient = Ingredient.objects.get(pk=ingredient_id)
            
            # Shopping 레코드 생성 (모델의 save 로직에 따라 Fridge에도 자동 추가됨)
            Shopping.objects.create(
                person=person,
                ingredient=ingredient,
                quantity=quantity,
                purchased_date=timezone.now().date()
            )
        
        return JsonResponse({"message": "구매가 성공적으로 처리되었고, 재료가 냉장고에 추가되었습니다."}, status=201)

    except Person.DoesNotExist:
        return JsonResponse({"error": "사용자를 찾을 수 없습니다."}, status=404)
    except Ingredient.DoesNotExist:
        return JsonResponse({"error": "장바구니에 유효하지 않은 재료가 포함되어 있습니다."}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ------------------------------
# 로그인 API
# ------------------------------
@api_view(['POST'])
@csrf_exempt
def login_user(request):
    user_id = request.data.get('user_id')
    password_2 = request.data.get('password_2')

    try:
        person = Person.objects.get(user_id=user_id)
        if person.password_2 == password_2:
            return JsonResponse({
                "message": "로그인 성공",
                "user_id": person.user_id,
                "name": person.name,
                "address": person.address,
                "is_vegan": person.is_vegan
            }, status=200)
        else:
            return JsonResponse({"error": "비밀번호가 일치하지 않습니다."}, status=401)

    except Person.DoesNotExist:
        return JsonResponse({"error": "존재하지 않는 사용자입니다."}, status=404)


# ------------------------------
# 회원가입 API
# ------------------------------
@api_view(['POST'])
@csrf_exempt
def signup_user(request):
    try:
        data = request.data
        name = data.get('name')
        address = data.get('address')
        user_id = data.get('user_id')
        password_2 = data.get('password_2')
        is_vegan = data.get('is_vegan', False)
        allergies = data.get('allergies', [])

        if Person.objects.filter(user_id=user_id).exists():
            return JsonResponse({"error": "이미 존재하는 아이디입니다."}, status=400)

        person = Person.objects.create(
            name=name,
            address=address,
            user_id=user_id,
            password_2=password_2,
            is_vegan=is_vegan
        )

        for allergy_name in allergies:
            allergy_obj, _ = Allergy.objects.get_or_create(allergy_name=allergy_name)
            PersonAllergy.objects.create(person=person, allergy=allergy_obj)

        return JsonResponse({
            "message": "회원가입 성공",
            "user_id": person.user_id,
            "name": person.name,
            "address": person.address,
            "is_vegan": person.is_vegan
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ------------------------------
# React용 냉장고 재료 조회 API
# ------------------------------
@api_view(['GET'])
@csrf_exempt
def fridge_items_api(request):
    user_id = request.GET.get('user_id')
    try:
        person = Person.objects.get(user_id=user_id)
        fridge_items = Fridge.objects.filter(person=person).select_related('ingredient')

        data = [
            {
                "fridge_id": item.fridge_id, # ✅ 추가된 부분
                "ingredient": item.ingredient.ingredient_name,
                "quantity": float(item.f_quantity),
                "unit": item.ingredient.unit,
                "category": item.ingredient.ingredient_category,
                "added_date": item.added_date.strftime("%Y-%m-%d"),
                "expiry_date": item.expiry_date.strftime("%Y-%m-%d")  # 🔥 변경 완료
            }
            for item in fridge_items
        ]
        return JsonResponse({"items": data}, status=200)

    except Person.DoesNotExist:
        return JsonResponse({"error": "존재하지 않는 사용자입니다."}, status=404)
