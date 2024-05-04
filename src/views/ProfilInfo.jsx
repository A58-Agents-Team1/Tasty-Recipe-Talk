import { useContext } from "react"
import { AppContext } from "../context/AppContext";

export default function ProfilInfo() {
    const { userData } = useContext(AppContext);

    return (
        <div>
            <p>Username: {userData.handle}</p>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
        </div>
    );
}