import "./css/Commercial.css";

export default function Commercial({ className = "" }) {
  return (
    <aside className={`commercial ${className}`}>
      <h3 className="subtitle">What's in My Fridge?</h3>
      <h2 className="title">
        냉장고 속 재료를 자동으로 인식하고,<br />나만의 레시피를 만들어보세요!
      </h2>
      <div className="poster" />
    </aside>
  );
}
