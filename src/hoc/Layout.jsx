import NavBar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
import PropTypes from "prop-types"

export default function Layout({ children }) {
    return (
        <div style={{ background: "aqua" }}>
            <NavBar />
            {children}
            <Footer />
        </ div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}