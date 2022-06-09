import { useNavigate } from "react-router-dom";
const ViewTable = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/UserAdminPanel");
        }}
      >
        Back to user AdminPanel
      </button>
    </div>
  );
};

export default ViewTable;
