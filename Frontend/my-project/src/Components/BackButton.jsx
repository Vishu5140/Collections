import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto flex justify-end p-4">
      <button
        onClick={() => navigate("/admin/home")}
        className="px-5 py-2 rounded-lg bg-gray-800 text-white
                   hover:bg-gray-700 transition duration-300
                   shadow-md"
      >
        ← Back
      </button>
    </div>
  );
}

export default BackButton;