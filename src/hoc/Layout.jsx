import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import PropTypes from "prop-types"


export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}