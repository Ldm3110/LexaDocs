import { useNavigate } from "react-router-dom";

const displaySidebar = {
  left: 0,
  width: "auto",
  height: "100vh",
};

const styleTab = {
  cursor: "pointer",
  marginBottom: "30px",
};

export function CustomerSidebar() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="bg-light" style={displaySidebar}>
        <ul className="space-y-4 px-3 mt-5">
          <li
            className="cursor-pointer"
            style={styleTab}
            onClick={() => navigate("/dashboard")}
          >
            <a className="text-blue-500 hover:text-blue-700">Dashboard Client</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CustomerSidebar;
