import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

interface CardProps {
  heading: string;
  description: string;
  icon: string;
}

import campingIcon from '../../assets/icons/barraca.png';
import planetaIcon from '../../assets/icons/ativAstronomica.png';
import telescopioIcon from '../../assets/icons/telescopioIcon.png';
import foodIcon from '../../assets/icons/alimentacaoIcon.png';
import naturezaIcon from '../../assets/icons/naturezaIcon.png';
import fogueiraIcon from '../../assets/icons/fogueiraIcon.png';

const Card = ({ heading, description, icon }: CardProps) => {
  return (
    <Box
      maxW={{ base: 'full', md: '295px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      bgColor="bgCard"
    >
      <Stack align={'center'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
        >
          <Image align={'center'} fit="contain" src={icon} />
        </Flex>
        <Box mt={2} textAlign="center" color="blueLetter.500">
          <Heading fontSize="1.1rem">{heading}</Heading>
          <Text mt={1} fontSize={'0.9rem'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function OqOferece() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading
          fontWeight={'bold'}
          display="inline-block"
          as="h2"
          size="xl"
          bgGradient="linear(to-r, blue.100, gray.100 )"
          backgroundClip="text"
        >
          O que a Noite nas Estrelas oferece?
        </Heading>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Camping'}
            icon={campingIcon}
            description={'Área gramada, com banheiros, estacionamento etc.'}
          />
          <Card
            heading={'Atividade Astronômica'}
            icon={planetaIcon}
            description={
              'Momento simplesmente inesquecivel! Observação celeste guiada pelo instrutor.'
            }
          />
          <Card
            heading={'Super Telescópio'}
            icon={telescopioIcon}
            description={
              'Telescópios de altíssima qualidade, para observação da Lua, Júpiter, Saturno etc.'
            }
          />
          <Card
            heading={'Alimentação'}
            icon={foodIcon}
            description={
              ' Jantar e café da manhã feitos com muito amor e carinho!'
            }
          />
          <Card
            heading={'Natureza'}
            icon={naturezaIcon}
            description={
              'Belissima chácara com cerrado nativo. Local de paz, tranquilidade e um céu super estrelado.'
            }
          />
          <Card
            heading={'Fogueira'}
            icon={fogueiraIcon}
            description={
              ' Momento especial para se aquecer ao calor do fogo, assar batatas e marshmallows.'
            }
          />
        </Flex>
      </Container>
    </Box>
  );
}
