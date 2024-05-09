import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function Comment({ comments }) {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Comments</Heading>
      </CardHeader>

      <CardBody>
        <Stack
          divider={<StackDivider />}
          spacing='4'
        >
          {comments.length !== 0 ? (
            comments.map((comment) => (
              <Box key={comment.id}>
                {console.log('FROM COMMENT:', comment.id)}
                <Heading
                  size='xs'
                  textTransform='uppercase'
                >
                  {comment.author}
                </Heading>
                <Text
                  pt='2'
                  fontSize='sm'
                >
                  {comment.content}
                </Text>
              </Box>
            ))
          ) : (
            <Box>
              <Heading
                size='xs'
                textTransform='uppercase'
              >
                No Comments yet
              </Heading>
              <Text
                pt='2'
                fontSize='sm'
              >
                Congratulations you can be the first one who will comment that
                post.
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
};
