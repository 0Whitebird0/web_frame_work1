'webFrameWork' 폴더 하나 만들어서 그 안에 
mkdir client
명령어 실행해주세요

# 1. React 앱 생성 (JavaScript)
npx create-react-app client
cd client

# 2. TailwindCSS 관련 패키지 설치 (3.x 버전 권장)
npm install -D tailwindcss@3.4.18 postcss autoprefixer

# 3. Tailwind 초기화 (환경에 따라 npx 또는 npm 스크립트 사용)
npx tailwindcss init -p
// 오류나면 client디렉터리 삭제했다가 다시해주세요
// tailwind.config.js 이 파일 업로드 해놓은거로 수정해주세요.
// src/index.css 이거도 업로드 해놓은거로 수정해주세요.
# 4. Ant Design 설치 -- 이거는 필요없을듯합니다.!!
npm install antd

# 5. Firebase 클라이언트 설치 -- 이거도 필요없을듯 합니다.!!
npm install firebase
// firebase.js는 직접 폴더를 추가해야해요, src밑에 제가 업로드해둔거로 추가하시면 됩니다.
// 내용은 나중에 수정해야해요
// 6번 실행하기 전에 App.js코드를 수정해주세요, 기본 설정으로 뭐가 구성되어있긴한데
// 제가 임시로 버튼 클릭 시 다른 버튼 추가되는 화면으로 만들어놨습니다. tailwindcss랑 antdesign방식은 이번주 주말에 회의 할 때 알려드릴께요

# 6. 라우터 돔과 이모티콘 라이브러리 설치하기
npm install react-router-dom react-icons-fa
라우터 돔은 화면전환에 필요한 컴포넌트들을 제공하고
icon 라이브러리는 아이콘 모양을 제공합니다. 이거는 나중에 src이미지로 대체할 예정입니다.

# 7. 개발 서버 실행
npm start

지금까지 client 폴더 내에 설정하였습니다. 프론트엔드 초기설정이였구요, 앞으로 진행하면서 필요한게 있으면 추가하겠습니다.


파일 구조도를 설명드리겠습니다
피그마에 나와있는 화면이름으로 디렉터리를 넣고 그 안에 각 화면마다 구성되는 개별 화면들을 넣어놨습니다. 공통되는 화면 몇개는 메인페이지에 임시로 넣어두었습니다.
styles라는 디렉터리도 하나 만들어서 안에 theme라는 파일을 생성했습니다. 그 안에다가 tailwindcss코드를 넣고 직접 사용할때는 import 해와서 사용하면 됩니다.
예시로는 LoginPage를 참고하시면 됩니다.

원래 화면 전환을 할때에 매개변수로 props를 넘겨줘서 화면을 구성한다고 말이 나왔었는데, 그냥 비슷한 방식으로 react-router-dom 에서 제공하는 컴포넌트로 전달하는 방법이 있으니 그거로 사용하도록 하겠습니다. 예를들어서 MainPage폴더의 RecommandedRecipes화면에서 사용한 방법이 메뉴 하나를 클릭했을 때 해당 메뉴의 id값을 함께 넘겨주는 방식으로 RecipeDetailPage로 넘어가는 부분이 작성되어있으니 참고하시면 될것같습니다. 
