import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import { logoutUser } from "../services/auth.service";

export default function NavBar() {

    const { user, setAppState } = useContext(AppContext);

    const logout = async() => {
        await logoutUser();
        setAppState({ user: null, userData: null})
    };

    return (
        <nav>
                <NavLink to="/">Home</NavLink>
                { user 
            ? (
                <>
                    <button onClick={logout}>LogOut</button>
                </>
            )
            : <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </>}
        </nav>
    )
}