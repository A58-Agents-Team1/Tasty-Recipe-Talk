import { Heading, Text, Box, Flex, Badge, Tooltip } from '@chakra-ui/react';

export default function About() {
  return (
    <Box p={8}>
      <Heading
        as='h1'
        size='xl'
        textAlign='center'
        mb={4}
        p={4}
        backgroundColor={'yellow.200'}
        border={'2px solid'}
        borderRadius={'md'}
      >
        Welcome to{' '}
        <Tooltip
          hasArrow
          label='Tisho'
          bg='blue.600'
          fontSize='sm'
        >
          <Badge
            colorScheme='orange'
            fontSize='x-lg'
            mr={2}
            mb={2}
          >
            T
          </Badge>
        </Tooltip>
        asty{' '}
        <Tooltip
          hasArrow
          label='Rado'
          bg='blue.600'
          fontSize='sm'
        >
          <Badge
            colorScheme='blue'
            fontSize='x-lg'
            mr={2}
            mb={2}
          >
            R
          </Badge>
        </Tooltip>
        ecipe{' '}
        <Tooltip
          hasArrow
          label='Tanya'
          bg='blue.600'
          fontSize='sm'
        >
          <Badge
            colorScheme='orange'
            fontSize='x-lg'
            mr={2}
            mb={2}
          >
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
        backgroundColor={'yellow.200'}
        border={'2px solid'}
        borderRadius={'md'}
      >
        <Text
          fontSize='xl'
          textAlign='center'
          mb={8}
        >
          Our Journey: <strong>At Tasty Recipe Talk</strong>, we're passionate
          about bringing people together through the universal language of food.
          Whether you're a seasoned chef or a kitchen newbie, everyone has a
          story to share, and we're here to amplify those voices. Our journey
          began with a simple idea: to create a space where home cooks from all
          walks of life could come together to celebrate their love for cooking,
          share cherished family recipes, and discover new culinary adventures.
        </Text>
        <Text
          fontSize='xl'
          mb={4}
        >
          Our platform allows you to:
        </Text>
        <Text
          fontSize='xl'
          ml={4}
        >
          -{' '}
          <Badge
            colorScheme='orange'
            fontSize='xl'
            mr={2}
            mb={2}
          >
            Upload
          </Badge>
          your favorite homemade recipes with mouth-watering pictures.
        </Text>
        <Text
          fontSize='xl'
          ml={4}
          mb={4}
        >
          -{' '}
          <Badge
            colorScheme='blue'
            fontSize='xl'
            mr={2}
            mb={2}
          >
            Create
          </Badge>
          a personalized account to manage your recipes and engage with the
          community.
        </Text>
        <Text
          fontSize='xl'
          ml={2}
          mb={2}
        >
          -{' '}
          <Badge
            colorScheme='orange'
            fontSize='xl'
            mr={2}
            mb={2}
          >
            Comment
          </Badge>
          on your favorite recipes.
        </Text>
        <Text
          fontSize='xl'
          textAlign='center'
        >
          Join Tisho, Rado, and Tanya in exploring the culinary world together!
        </Text>
        <Text
          fontSize='xl'
          mt={8}
        >
          Whether you're a seasoned chef, an adventurous amateur, or just
          someone who loves good food, there's a place for you here at Tasty
          Recipe Talk. Our journey began with a simple idea: to create a space
          where home cooks from all walks of life could come together to
          celebrate their love for cooking, share cherished family recipes, and
          discover new culinary adventures.
        </Text>
        <Text
          fontSize='lg'
          mt={4}
        >
          We believe in the power of food to bring people together, and that's
          why we've built a platform that's more than just a recipe-sharing
          website—it's a vibrant community where food enthusiasts can connect,
          inspire, and learn from one another.
        </Text>
        <Text
          fontSize='lg'
          mt={4}
        >
          <Badge
            colorScheme='orange'
            fontSize='x-lg'
            mr={2}
            mb={2}
          >
            Join us
          </Badge>
          <br /> So what are you waiting for? Whether you're a seasoned chef, an
          adventurous amateur, or just someone who loves good food, there's a
          place for you here at <strong>At Tasty Recipe Talk</strong>. Join our
          growing community today and let's embark on a culinary journey
          together!
        </Text>
      </Flex>
    </Box>
  );
}
