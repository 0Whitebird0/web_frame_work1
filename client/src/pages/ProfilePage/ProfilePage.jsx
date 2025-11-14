import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/ProfilePage.css";
import ProfileHeader from "./components/ProfileHeader";
import ProfileTag from "./components/ProfileTag";
import ProfileStats from "./components/ProfileStats";
import ProfileInfo from "./components/ProfileInfo";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = {
    name: "한성",
    address: "서울특별시 성북구 안암로 16길 116",
    id: "hansung",
    pw: "1234",
    isVegan: false,
    allergies: ["우유", "새우"],
    manualTags: ["한식", "매운맛"],
  };

  // 자동 태그 생성
  const autoTags = [];
  if (user.isVegan) autoTags.push("비건");
  user.allergies.forEach((a) => autoTags.push(`${a}알러지`));

  const finalTags = [...user.manualTags, ...autoTags];

  return (
    <div className="profile-page">

      {/* 프로필 상단 */}
      <ProfileHeader user={user} />

      {/* 태그 리스트 */}
      <div className="profile-tags-box">
        <div className="profile-tags">
          {finalTags.map((tag, idx) => (
            <ProfileTag key={idx} label={tag} />
          ))}
        </div>
      </div>

      {/* 내 정보 */}
      <ProfileInfo user={user} />

      {/* 통계 카드 */}
      <ProfileStats
        stats={{
          saved: 12,
          uploaded: 4,
          checklist: 6,
        }}
      />

      {/* 버튼 */}
      <div className="profile-buttons">
        <button className="edit-btn"
          onClick={() => navigate("/profile-edit")}   // 버튼 클릭 이동
        >
          개인정보 수정
        </button>
        <button className="logout-btn">로그아웃</button>
      </div>

    </div>
  );
}
