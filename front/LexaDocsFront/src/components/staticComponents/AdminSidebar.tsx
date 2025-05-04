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

export function AdminSidebar() {

  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="bg-light" style={displaySidebar}>
        <ul className="space-y-4 px-3 mt-5">
          <li
            className="cursor-pointer"
            style={styleTab}
            onClick={() => navigate('/dashboard')}
          >
            <a className="text-gray-700 hover:text-blue-500">Dashboard</a>
          </li>
          <li
            className="cursor-pointer"
            style={styleTab}
            onClick={() => navigate('/clients')}
          >
            <a className="text-gray-700 hover:text-blue-500">Clients</a>
          </li>
          <li
            className="cursor-pointer"
            style={styleTab}
            onClick={() => navigate('/dossiers')}
          >
            <a className="text-gray-700 hover:text-blue-500">Dossiers</a>
          </li>
          <li className="cursor-pointer" style={styleTab}>
            <a className="text-gray-700 hover:text-blue-500">Assistants</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;