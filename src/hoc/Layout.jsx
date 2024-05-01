import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import PropTypes from "prop-types"


export default function Layout({ children }) {
    return (
        <div style={{ background: "grey" }}>
            <NavBar />
            {children}
            <Footer />
        </ div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}