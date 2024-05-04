import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Box bg='gray.400' minHeight='100vh' height='100%'>
      <NavBar />
      <Flex
        direction='column'
        align='center'
        justify='center'
        border='1px solid'
        borderColor='gray.600'
        borderRadius='md'
        bg='gray.300'
        p='1rem'
        mt='1rem'
        mx='1rem'
        shadow='2xl'
      >
        {children}
      </Flex>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
