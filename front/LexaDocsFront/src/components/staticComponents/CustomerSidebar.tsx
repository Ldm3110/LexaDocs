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
    <div className="d-flex">
      <div className="bg-light" style={displaySidebar}>
        <ul className="nav flex-column px-3 mt-5">
          <li
            className="nav-item"
            style={styleTab}
            onClick={() => navigate("/dashboard")}
          >
            <a className="nav-link active">Dashboard Client</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CustomerSidebar;
