import { Flex, Container, Heading, Stack, Text, Box } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { Cupom } from './Cupom';
import { EventDateContext } from './EventDateContext';
import { IsActive } from './IsActive';
import { PriceContext } from './PriceContext';

interface homeProps {
  nameUser: string;
}

export function Home({ nameUser }: homeProps) {
  const welcomeMessage = `Bem vindo ${nameUser.replace(/,/g, '')}`;

  return (
    <>
      <Flex>
        <Text>Home</Text>
        <Flex m="0.3rem">
          <FiChevronRight />
        </Flex>
        <Text color="orange.400">{welcomeMessage}</Text>
      </Flex>
      <Flex
        mt="2rem"
        maxW={'6xl'}
        px="2rem"
        // justify={'space-evenly'}
        // border="1px solid red"
      >
        <Box mr="3rem">
          <EventDateContext />
          <Cupom />
        </Box>
        <Flex gap={5}>
          <PriceContext />
          <Flex align="start">
            <IsActive />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
