import { useEffect, useState } from "react";
import { getAllPosts, getAllUsers } from "../services/users.service";
import { Breadcrumb, BreadcrumbItem, Flex, Text } from "@chakra-ui/react";
export default function Footer() {
  const [countUser, setCountUser] = useState();
  const [countPosts, setCountPosts] = useState();

  useEffect(() => {
    getAllUsers().then((data) => setCountUser(data));
    getAllPosts().then((data) => setCountPosts(data));
  }, []);

  return (
    <Flex
      as='footer'
      position='fixed'
      bottom='0'
      width='100%'
      p='5'
      mt='4'
      bg='gray.500'
      justifyContent='center'
      alignItems='center'
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
