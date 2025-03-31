//import { useEffect } from "react";
import { isAuth, useAuthStore } from "../hooks/useAuth";
// import { useFetch } from "../hooks/useFetch";

export function MyProfile() {
  // const { get } = useFetch();
  isAuth();
  const user = useAuthStore((state) => state.user);

  // useEffect(() => {

  // })

  return (
    <>
      <h3>
        MyProfile - {user.id} - {user.name}
      </h3>
    </>
  );
}

export default MyProfile;
