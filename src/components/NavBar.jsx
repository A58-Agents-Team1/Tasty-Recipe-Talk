import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <ul>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </ul>
        </nav>
    )
}