import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import bgEstrelado from '../../assets/ceuEstreladoAzul.png';

import eliasImg from '../../assets/people/elias.png';
import izabelaImg from '../../assets/people/izabela.png';
import pedroImg from '../../assets/people/pedro.png';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'justify'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name }: { src: string; name: string }) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text color="white" fontWeight={600}>
          {name}
        </Text>
      </Stack>
    </Flex>
  );
};

export function Testemonials() {
  return (
    <Box
      bgImage={bgEstrelado}
      bgRepeat="no-repeat"
      bgSize={'cover'}
      bgPosition="center"
    >
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading
            display="inline-block"
            as="h2"
            size="xl"
            bgGradient="linear(to-r, gray.100, blue.200)"
            backgroundClip="text"
          >
            Eu já fui!
          </Heading>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>“Amamos cada momento”</TestimonialHeading>
              <TestimonialText>
                “Temos dois filhos, o caçula pequeno não foi, então fui com
                minha fila mais velha, Emanuella. Foi uma experiência ímpar!
                Maravilhosa!!! Amamos cada momento, a organização, a comida
                perfeita, o acolhimento do dono da chácara, os equipamentos
                profissionais incríveis. Foi tão rico o encontro. Ficou em
                nossas memórias esse encontro, e queremos muito aproveitar
                novamente, e agora com o caçula junto. Vocês são incríveis! Que
                venham muitos outros, e esperamos estar juntos novamente.”
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar src={izabelaImg} name={'Isabela Medeiros'} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                “Eu nunca tinha visto algo assim!”
              </TestimonialHeading>
              <TestimonialText>
                “Fui no evento para comemorar o Dia dos Pais juntamente com a
                minha filha de 6 anos. Eu e ela curtimos muito estar juntos para
                ver o céu estrelado, foi super bacana. O momento mais marcante
                foi quando minha filha foi observar a Lua através do telescópio.
                Ao aproximar o olho da lente, o brilho da lua foi tão forte que
                vi o rosto dela todo iluminado. Ela ficou extremamente
                encantada! “Nossa, pai! Que lindo, eu nunca tinha visto algo
                assim!”. Esse momento ficou gravado na minha memória. Com
                certeza iremos novamente no próximo!”
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar src={pedroImg} name={'Pedro Mesquita'} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Mindblowing Service</TestimonialHeading>
              <TestimonialText>
                “Fui no evento para comemorar o Dia dos Pais juntamente com a
                minha filha de 6 anos. Eu e ela curtimos muito estar juntos para
                ver o céu estrelado, foi super bacana. O momento mais marcante
                foi quando minha filha foi observar a Lua através do telescópio.
                Ao aproximar o olho da lente, o brilho da lua foi tão forte que
                vi o rosto dela todo iluminado. Ela ficou extremamente
                encantada! “Nossa, pai! Que lindo, eu nunca tinha visto algo
                assim!”. Esse momento ficou gravado na minha memória. Com
                certeza iremos novamente no próximo!”
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar src={eliasImg} name={'Elias Barbosa'} />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
