import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import background from '../../public/background.jpg';

export default function Layout({ children }) {
  return (
    <Flex
      direction='column'
      minHeight='100vh'
      height='100%'
      width='100%'
      background={`url(${background})`}
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      blur='400px'
    >
      <NavBar />
      <Flex
        justify='center'
        borderColor='gray.600'
        borderRadius='md'
        bgGradient={'linear(to-r,green.400, green.700, green.500)'}
        p='1rem'
        my='1rem'
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
