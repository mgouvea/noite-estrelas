import {
  Box,
  Heading,
  Text,
  Button,
  Img,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Navbar } from '../Navbar';

import logo from '../../assets/logo.svg';
import bgInicio from '../../assets/fundoInicio.svg';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <>
      <Navbar />
      <Box
        textAlign="left"
        pt={'15rem'}
        pl={'10rem'}
        height="70vh"
        bgImage={bgInicio}
        bgRepeat="no-repeat"
        bgSize={'cover'}
        bgPosition="center"
      >
        <Flex>
          <Img
            src={logo}
            alt="logo noite nas estrelas"
            boxSize="9.5rem"
            objectFit="contain"
            mr={isWideVersion ? '2rem' : ''}
          />
          <Box>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, white, gray.200)"
              backgroundClip="text"
            >
              Noite nas Estrelas
            </Heading>
            <Text color={'gray.100'} mb={6} mt={2} fontSize="1.3rem">
              Um acampamento astronômico inesquecível para toda a família!
            </Text>
          </Box>
        </Flex>

        <Button
          colorScheme="blue"
          bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
          color="white"
          variant="solid"
          ml="0.2rem"
          mt="3rem"
          w="10rem"
          fontSize={'lg'}
        >
          Inscreva-se
        </Button>
      </Box>
    </>
  );
}
