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
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import bgInicio from '../../assets/fundoInicio.svg';
import { forwardRef } from 'react';

function Header({ inscricaoAtiva }: any, ref: any) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  let navigate = useNavigate();

  return (
    <>
      <Box
        ref={ref}
        textAlign="left"
        // pt={'15rem'}
        pl={isWideVersion ? '10rem' : '2rem'}
        pt={isWideVersion ? '10rem' : '10rem'}
        height="70vh"
        bgImage={bgInicio}
        bgRepeat="no-repeat"
        bgSize={'cover'}
        bgPosition="center"
      >
        <Flex>
          {isWideVersion ? (
            <Img
              src={logo}
              alt="logo noite nas estrelas"
              boxSize="9.5rem"
              objectFit="contain"
              mr={isWideVersion ? '2rem' : ''}
            />
          ) : (
            ''
          )}
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
            <Text
              color={'gray.100'}
              mb={6}
              mt={2}
              fontSize={isWideVersion ? '1.3rem' : '1.1rem'}
            >
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
          mt={isWideVersion ? '3rem' : '2rem'}
          w={isWideVersion ? '10rem' : '9rem'}
          // w="10rem"
          fontSize={'lg'}
          isDisabled={inscricaoAtiva == 'yes' ? false : true}
          onClick={() => {
            inscricaoAtiva == 'yes' ? navigate('/inscricao') : '';
          }}
        >
          Inscreva-se
        </Button>
      </Box>
    </>
  );
}

export default forwardRef(Header);
