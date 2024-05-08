import { useEffect, useState } from 'react';
import { getAllPosts, getAllUsers } from '../services/users.service';
import { Breadcrumb, BreadcrumbItem, Flex, Text } from '@chakra-ui/react';
export default function Footer() {
  const [countUser, setCountUser] = useState();
  const [countPosts, setCountPosts] = useState();

  useEffect(() => {
    getAllUsers().then((data) => setCountUser(data));
    getAllPosts().then((data) => setCountPosts(data));
  }, [countUser, countPosts]);

  return (
    <Flex
      as='footer'
      position='static'
      bottom='0'
      mt='auto'
      p='1rem'
      mb='1rem'
      mx='2rem'
      height={{ base: '10vh', md: '10vh' }}
      justify='space-evenly'
      alignItems='center'
      borderBottom='1px solid'
      borderColor='green.600'
      borderRadius='lg'
      shadow='2xl'
      bgGradient={'linear(to-r,green.400, green.700, green.500)'}
      color={'white'}
    >
      <Breadcrumb as='div'>
        <BreadcrumbItem>
          <Text>Number of created posts: {countPosts} 📜 </Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text> All rights reserved for Tasty Recipe Talk</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text> Number of created accounts: {countUser} 👤</Text>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
}
