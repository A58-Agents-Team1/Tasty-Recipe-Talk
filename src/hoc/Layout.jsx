import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <Flex
      direction='column'
      bg='gray.400'
      minHeight='100vh'
      height='100%'
      width='100%'
    >
      <NavBar />
      <Flex
        justify='center'
        borderColor='gray.600'
        borderRadius='md'
        bg='gray.300'
        p='1rem'
        mt='1rem'
        mb='auto'
        mx='2rem'
        shadow='2xl'
        minH={{ base: '80vh', md: '100%' }}
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
