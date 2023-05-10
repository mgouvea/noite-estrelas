import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import OqOferece from './OqOferece';

import visionImg from '../../assets/telescopeVision.png';
import bgEstrelado from '../../assets/ceuEstreladoAzul.png';
import { forwardRef } from 'react';

function Atividades({}, ref: any) {
  return (
    <Box
      ref={ref}
      bgImage={bgEstrelado}
      // bgRepeat="no-repeat"
      bgSize={'contain'}
      bgPosition="center"
      pb="2rem"
    >
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Box
              position={'relative'}
              height={'355px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
            >
              <Image
                alt={'imagem de criança e pai olhando telescópio'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={visionImg}
              />
            </Box>
          </Flex>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, gray.100, blue.200)"
              backgroundClip="text"
            >
              Uma experiência incrível
            </Heading>
            <Text color={'gray.200'} textAlign="justify" fontSize={'md'}>
              Imagine um lugar afastado das luzes da cidade, onde pais, mães e
              suas crianças possam observar as belezas de um céu super
              estrelado! A Noite nas Estrelas é um acampamento astronômico que
              acontece todos os anos na cidade de Brasília - DF. A atividade tem
              marcado o coração de muitas famílias, nesse magnifico momento de
              contato com a natureza celeste. Oportunidade única para quem quer
              aproveitar um final de semana de paz e tranquilidade e aprender um
              pouco mais sobre o universo!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
              justify={'right'}
            >
              {/* <Button
                rounded={'8px'}
                size={'md'}
                fontWeight={'normal'}
                px={5}
                colorScheme={'blue'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
              >
                Saiba mais
              </Button> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <OqOferece />
    </Box>
  );
}

export default forwardRef(Atividades);
