import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ProfileInfo() {
  const { userData } = useContext(AppContext);

  return (
    <div>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Username: {userData.handle}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}
