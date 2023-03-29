import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Divider,
  SimpleGrid,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

import bgCeuImg from '../../assets/ceuEstreladoAzulClaro.png';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      bg={'white'}
      mb={4}
      w="345px"
      maxWidth={'345px'}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
}

export function Price() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box
      py={12}
      bgImage={bgCeuImg}
      // bgRepeat={'no-repeat'}
      bgPosition="center"
      bgSize={'contain'}
    >
      <VStack spacing={2} textAlign="center">
        <Heading
          as="h2"
          fontSize="4xl"
          bgGradient="linear(to-r, blue.100, gray.100)"
          backgroundClip="text"
        >
          Quero Participar!
        </Heading>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12} bg="white" borderRadius={'8px'} mb="1.2rem">
            <Box>
              <Text fontWeight="500" fontSize="xl" color="blueLetter.500">
                Baby
              </Text>
              <Text fontWeight="500" fontSize="sm" color="blueLetter.500">
                (Até 4 anos)
              </Text>
              <Divider colorScheme={'blue'} />
            </Box>
            <HStack justifyContent="center" color={'orange.400'}>
              <Text fontSize="3xl" fontWeight="600">
                R$
              </Text>
              <Text fontSize="4xl" fontWeight="600">
                Zero
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="600" color="blueLetter.500"></Text>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box py={4} px={12} bg="white" borderRadius={'8px'}>
            <Box>
              <Text fontWeight="500" fontSize="xl" color="blueLetter.500">
                Criança
              </Text>
              <Text fontWeight="500" fontSize="sm" color="blueLetter.500">
                (Entre 5 e 14 anos)
              </Text>
              <Divider colorScheme={'blue'} />
            </Box>
            <HStack justifyContent="center" color={'orange.400'}>
              <Text fontSize="3xl" fontWeight="600">
                R$
              </Text>
              <Text fontSize="4xl" fontWeight="600">
                135,00
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="600" color="blueLetter.500">
              PIX
            </Text>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box py={4} px={12} bg="white" borderRadius={'8px'}>
            <Box>
              <Text fontWeight="500" fontSize="xl" color="blueLetter.500">
                Baby
              </Text>
              <Text fontWeight="500" fontSize="sm" color="blueLetter.500">
                (Até 4 anos)
              </Text>
              <Divider colorScheme={'blue'} />
            </Box>
            <HStack justifyContent="center" color={'orange.400'}>
              <Text fontSize="3xl" fontWeight="600">
                R$
              </Text>
              <Text fontSize="4xl" fontWeight="600">
                185,00
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="600" color="blueLetter.500">
              PIX
            </Text>
          </Box>
        </PriceWrapper>
      </Stack>

      <Flex justify={'center'}>
        {/* GRID 2 */}
        {isWideVersion ? (
          <SimpleGrid
            columns={[1, 3]}
            py={['1rem', null]}
            spacing={[5, 10]}
            w={['300px', '1118px']}
          >
            <Flex w="300px" align="center" ml="1.7rem">
              <Text
                fontSize="1.5rem"
                textAlign="center"
                fontWeight="bold"
                lineHeight="1.55rem"
                color={'white'}
              >
                Venha conhecer o universo com a gente!
              </Text>
            </Flex>
            <Flex w="300px" align="center" justify="center" ml="1.7rem">
              <Button colorScheme="blue" fontSize="2xl" w="12rem">
                Inscreva-se
              </Button>
            </Flex>
            <Flex
              w="300px"
              align="center"
              justify="center"
              ml="1.7rem"
              direction="column"
              color={'white'}
            >
              <Text
                fontSize="1.25rem"
                textAlign="center"
                fontWeight="bold"
                lineHeight="1.55rem"
              >
                PROMOÇÃO
              </Text>
              <Text
                fontSize="1.25rem"
                textAlign="center"
                fontWeight="bold"
                lineHeight="1.55rem"
              >
                Forme um grupo de 10 pessoas e ganhe 1 cortesia
              </Text>
            </Flex>
          </SimpleGrid>
        ) : (
          <SimpleGrid
            columns={[1, 3]}
            py={['1rem', null]}
            spacing={[7, 10]}
            w={['300px', '1118px']}
          >
            <Flex w="300px" align="center">
              <Text
                fontSize="1.5rem"
                textAlign="center"
                fontWeight="bold"
                lineHeight="1.55rem"
                color={'white'}
              >
                Venha conhecer o universo com a gente!
              </Text>
            </Flex>

            <Flex
              w="300px"
              align="center"
              justify="center"
              direction="column"
              color={'white'}
            >
              <Text
                fontSize="1.25rem"
                textAlign="center"
                fontWeight="bold"
                lineHeight="1.55rem"
              >
                PROMOÇÃO
              </Text>
              <Text
                fontSize="1.25rem"
                textAlign="center"
                fontWeight="bold"
                lineHeight="1.55rem"
              >
                Forme um grupo de 10 pessoas e ganhe 1 cortesia
              </Text>
            </Flex>
            <Flex w="300px" align="center" justify="center">
              <Button colorScheme="blue" fontSize="2xl">
                Inscreva-se
              </Button>
            </Flex>
          </SimpleGrid>
        )}
      </Flex>
    </Box>
  );
}
