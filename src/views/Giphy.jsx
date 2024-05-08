import { useState } from 'react';
import { getTrendyGifAsync } from '../services/users.service.js';
import { useEffect } from 'react';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';

const trendingAsync = async () => {
  const gifs = await getTrendyGifAsync();
  return gifs;
};

export default function Giphy() {
  const [gifs, setGifs] = useState();

  useEffect(() => {
    try {
      const getTrendyG = async () => {
        const gif = await trendingAsync();
        setGifs(gif.data);
      };
      getTrendyG();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <Box
      background={'#f9f9f9'}
      padding={'20px'}
      borderRadius={'10px'}
      boxShadow={'2xl'}
    >
      <Flex direction='column'>
        <Heading
          color={'coral'}
          fontSize={'32px'}
          marginBottom={'20px'}
          textAlign={'center'}
        >
          Here is some cooking gifs
        </Heading>
        <Grid gap={3} templateColumns={'repeat(4, 1fr)'}>
          {gifs &&
            gifs.map((gif) => {
              return (
                <div key={gif.id}>
                  <img
                    src={gif.images.original.url}
                    alt={gif.title}
                    width={'300px'}
                  />
                </div>
              );
            })}
        </Grid>
      </Flex>
    </Box>
  );
}
