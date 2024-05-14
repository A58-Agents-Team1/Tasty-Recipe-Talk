import { Heading, Text, Box, Flex, Badge, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/users.service';

export default function About() {
  const [countUser, setCountUser] = useState();

  useEffect(() => {
    getAllUsers().then((data) => setCountUser(data));
  }, [countUser]);

  return (
    <Box p={8}>
      <Heading
        as='h1'
        size='xl'
        textAlign='center'
        mb={4}
        p={4}
        backgroundColor={'yellow.300'}
        border={'2px solid'}
        borderRadius={'md'}
      >
        Welcome to{' '}
        <Tooltip hasArrow label='Tisho' bg='blue.600' fontSize='sm'>
          <Badge colorScheme='orange' fontSize='x-lg' mr={2} mb={2}>
            T
          </Badge>
        </Tooltip>
        asty{' '}
        <Tooltip hasArrow label='Rado' bg='blue.600' fontSize='sm'>
          <Badge colorScheme='blue' fontSize='x-lg' mr={2} mb={2}>
            R
          </Badge>
        </Tooltip>
        ecipe{' '}
        <Tooltip hasArrow label='Tanya' bg='blue.600' fontSize='sm'>
          <Badge colorScheme='orange' fontSize='x-lg' mr={2} mb={2}>
            T
          </Badge>
        </Tooltip>
        alk
      </Heading>
      <Flex
        direction='column'
        p={8}
        alignItems='flex-start'
        justifyContent='center'
        mb={4}
        backgroundColor={'yellow.300'}
        border={'2px solid'}
        borderRadius={'md'}
      >
        <Text fontSize='lg' fontWeight='bold' mb={4}>
          Welcome to Tasty Recipe Talk - where culinary enthusiasts of all
          levels come together to celebrate their love for cooking, share
          cherished family recipes, and embark on new culinary adventures.
        </Text>
        <Box
          p={4}
          m={2}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          <Badge colorScheme='green' fontSize='xl' mb={2}>
            About Us:
          </Badge>
          <Text>
            At Tasty Recipe Talk, we`re passionate about bringing people
            together through the universal language of food. Our journey began
            with a simple idea: to create a space where home cooks from all
            walks of life could connect, inspire, and learn from one another.
          </Text>
        </Box>
        <Box
          p={4}
          m={2}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          <Badge colorScheme='green' fontSize='xl' mb={2}>
            Our Community:
          </Badge>
          <Text>
            With over {countUser} members, Tasty Recipe Talk is a vibrant online
            community dedicated to the joy of cooking. Whether you`re a seasoned
            chef, an adventurous amateur, or simply someone who loves good food,
            there`s a place for you here.
          </Text>
        </Box>
        <Box
          p={4}
          m={2}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          <Badge colorScheme='green' fontSize='xl' mb={2}>
            What We Offer:
          </Badge>
          <Text>
            Share and discover homemade recipes with mouth-watering pictures.
            Create a personalized account to manage your recipes and engage with
            the community. Comment and interact with fellow food enthusiasts,
            sharing tips, tricks, and stories. Trust and Moderation: Rest
            assured, the information on Tasty Recipe Talk is peer-vetted by our
            dedicated community. Our team of moderators and administrators
            ensure that discussions remain informative, respectful, and
            spam-free.
          </Text>
        </Box>
        <Box
          p={4}
          m={2}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          <Badge colorScheme='green' fontSize='xl' mb={2}>
            Our platform allows you to:
          </Badge>
          <Text>
            Upload your favorite homemade recipes with mouth-watering pictures.
          </Text>
          <Text>
            Create a personalized account to manage your recipes and engage with
          </Text>
          <Text>the community. Comment on your favorite recipes.</Text>
        </Box>
        <Box
          p={4}
          m={2}
          border='2px'
          borderRadius='md'
          borderColor='gray.800'
          background={'yellow.100'}
        >
          <Badge colorScheme='green' fontSize='xl' mb={2}>
            Join Us:
          </Badge>
          <Text>
            So why wait? Join our growing community today and let`s embark on a
            culinary journey together. Whether you`re looking to expand your
            culinary skills, connect with like-minded individuals, or simply
            find inspiration for your next meal, Tasty Recipe Talk is the place
            to be.
          </Text>
        </Box>
        <Box>
          <Text fontSize='lg' fontWeight='bold' mt={4}>
            We`re excited to have you join Tisho, Rado, and Tanya in exploring
            the culinary world as we embark on a culinary journey together!
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
