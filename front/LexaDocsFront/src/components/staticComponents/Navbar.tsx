import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const styleLogo = { width: "200px", height: "auto", cursor: "pointer" };
const styleDisconnect = { cursor: "pointer" };

export function Navbar() {
  const { logout } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const disconnect = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  const returnDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav
      className="navbar navbar-light d-flex justify-content-between"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <img
        className="ms-3"
        src="/logo/LEGALL Avocat v2.svg"
        alt="LEGALL-logo"
        style={styleLogo}
        onClick={returnDashboard}
      />
      <div className="dropdown me-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {localStorage.getItem("name")}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
          <li>
            <hr className="dropdown divider" />
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={disconnect}
              style={styleDisconnect}
            >
              Se déconnecter
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
