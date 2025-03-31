import { useNavigate } from "react-router-dom";

const displaySidebar = {
  left: 0,
  width: "auto",
  height: "100vh"
}

const styleTab = {
  cursor: "pointer",
  marginBottom: "30px"
}

export function StaffSidebar() {

  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <div className="bg-light" style={displaySidebar}>
        <ul className="nav flex-column px-3 mt-5">
          <li className="nav-item" style={styleTab} onClick={() => navigate('/dashboard')}>
            <a className="nav-link active" >
              Dashboard
            </a>
          </li>
          <li className="nav-item" style={styleTab} onClick={() => navigate('/clients')}>
            <a className="nav-link" >
              Clients
            </a>
          </li>
          <li className="nav-item" style={styleTab} onClick={() => navigate('/dossiers')}>
            <a className="nav-link" >
              Dossiers
            </a>
          </li>
          <li className="nav-item" style={styleTab}>
            <a className="nav-link" >
              Assistants
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StaffSidebar;