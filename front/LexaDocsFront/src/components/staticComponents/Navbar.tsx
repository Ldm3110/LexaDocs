import { NavigateFunction, useNavigate } from "react-router-dom";
import { logout, useAuthStore } from "../../hooks/useAuth";

const styleLogo = { width: "200px", height: "auto", cursor: "pointer" };
const stylePointer = { cursor: "pointer" };

export function Navbar() {
  const navigate: NavigateFunction = useNavigate();
  const user = useAuthStore((state) => state.user);

  const disconnect = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  const myProfile = () => {
    navigate("/myprofile");
  };

  return (
    <nav
      className="navbar navbar-light d-flex justify-content-between"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <img
        className="ms-3"
        src="/logo/lexadoc.svg"
        alt="LEGALL-logo"
        style={styleLogo}
        onClick={() => navigate("/dashboard")}
      />
      <div className="dropdown me-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.name}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a
              className="dropdown-item"
              onClick={myProfile}
              style={stylePointer}
            >
              Mon Profil
            </a>
          </li>
          <li>
            <hr className="dropdown divider" />
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={disconnect}
              style={stylePointer}
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
