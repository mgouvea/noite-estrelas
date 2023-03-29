import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { List } from './List';

import bgFundo from '../../assets/ceuEstreladoAzul.png';
import bgFundoCard from '../../assets/ceuEstreladoAzulClaro.png';

import jupiterImg from '../../assets/byTelescope/Jupiter.svg';
import luaImg from '../../assets/byTelescope/Lua.svg';
import PleImg from '../../assets/byTelescope/Pleiades.svg';
import saturnoImg from '../../assets/byTelescope/Saturno.svg';

export function OqLevar() {
  return (
    <Flex
      // h={[null, '70vh']}
      bgImage={bgFundo}
      bgRepeat="no-repeat"
      bgPosition={'center'}
      bgSize="cover"
    >
      <Flex w="100%">
        <SimpleGrid columns={[1, 2]} w="100%">
          <Flex
            direction="column"
            align="center"
            justify="center"
            my={['1.5rem', null]}
          >
            <Heading
              display="inline-block"
              as="h2"
              size="lg"
              bgGradient="linear(to-r, gray.100, gray.300)"
              backgroundClip="text"
              w="25rem"
              textAlign={'center'}
              mb="2rem"
            >
              O que eu preciso levar para o acampamento?
            </Heading>
            <Flex
              w={['25rem', '28.44rem']}
              h={['36rem', '28.75rem']}
              borderRadius="0.3rem"
              bgImage={bgFundoCard}
            >
              <Box
                h="60px"
                bg="blueLetter.400"
                w="100%"
                borderTopRadius="0.3rem"
              >
                <Text
                  fontSize="1.25rem"
                  fontWeight="bold"
                  ml="2rem"
                  pt="1.3rem"
                  color="gray.100"
                >
                  ITENS:
                </Text>
                <Flex mt="2rem" align="center" justify="center" px="3rem">
                  <List />
                </Flex>
              </Box>
            </Flex>
          </Flex>
          <Flex direction="column" align="center" justify="center">
            <Text
              mb="1rem"
              fontWeight="bold"
              textAlign="center"
              fontSize={['1.5rem', '2rem']}
              w={['20rem', '27rem']}
              color="gray.100"
            >
              Imagens obtidas com nosso super telescópio!
            </Text>
            <SimpleGrid
              columns={[2, 2]}
              spacing={10}
              w={['23rem', '28rem']}
              h={['30rem', '28rem']}
              mb="2rem"
              ml={['2rem', null]}
            >
              <Flex
                direction="column"
                w={['9rem', '12rem']}
                h="12rem"
                borderRadius="100%"
              >
                <Image src={jupiterImg} borderRadius="100%" border="1px" />
                <Text
                  fontSize="1rem"
                  fontWeight="bold"
                  textAlign="center"
                  mt="0.5rem"
                  color="gray.100"
                >
                  Jupiter e suas luas
                </Text>
              </Flex>
              <Flex
                direction="column"
                w={['9rem', '12rem']}
                h="12rem"
                borderRadius="100%"
              >
                <Image src={saturnoImg} borderRadius="100%" border="1px" />
                <Text
                  fontSize="1rem"
                  fontWeight="bold"
                  textAlign="center"
                  mt="0.5rem"
                  color="gray.100"
                >
                  Saturno
                </Text>
              </Flex>
              <Flex
                direction="column"
                w={['9rem', '12rem']}
                h="12rem"
                borderRadius="100%"
              >
                <Image src={PleImg} borderRadius="100%" border="1px" />
                <Text
                  fontSize="1rem"
                  fontWeight="bold"
                  textAlign="center"
                  mt="0.5rem"
                  color="gray.100"
                >
                  Aglomerado das Pleiades
                </Text>
              </Flex>
              <Flex
                direction="column"
                w={['9rem', '12rem']}
                h="12rem"
                borderRadius="100%"
              >
                <Image src={luaImg} borderRadius="100%" border="1px" />
                <Text
                  fontSize="1rem"
                  fontWeight="bold"
                  textAlign="center"
                  mt="0.5rem"
                  color="gray.100"
                >
                  Lua Crescente
                </Text>
              </Flex>
            </SimpleGrid>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
