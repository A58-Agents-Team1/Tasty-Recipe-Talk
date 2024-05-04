import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Box bg='gray.400' height='100vh'>
      <NavBar />
      <Box
        justifyContent='center'
        m='auto'
        p='4'
        alignItems='center'
        minWidth={{
          base: "100%",
          md: "80%",
        }}
        maxWidth='4xl'
        border={`1px solid black`}
        shadow={`lg`}
        borderRadius='md'
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
