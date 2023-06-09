import {
  Box,
  chakra,
  Container,
  Flex,
  Img,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';

import { Link as ReactRouter } from 'react-router-dom';

const currentTime = new Date();
const year = currentTime.getFullYear();

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export function Footer() {
  return (
    <Box bg={'bgNavbar'} color="gray.300">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaWhatsapp />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
          {/* <Link as={ReactRouter} to={'/'} style={{ textDecoration: 'none' }}>
            <Text _hover={{ color: 'blue.400' }}>Início</Text>
          </Link>
          <Link
            as={ReactRouter}
            to={'/Jeri'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'blue.400' }}>Sobre</Text>
          </Link>
          <Link
            as={ReactRouter}
            to={'/Pacotes'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'blue.400' }}>Cronograma</Text>
          </Link>
          <Link
            as={ReactRouter}
            to={'/Pacotes'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'blue.400' }}>FAQ</Text>
          </Link>
          <Link
            as={ReactRouter}
            to={'/Pacotes'}
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'blue.400' }}>Contato</Text>
          </Link> */}
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Link
            as={ReactRouter}
            to={'/painel'}
            style={{ textDecoration: 'none' }}
          >
            <Text style={{ cursor: 'default' }} fontSize={'small'}>
              © {year} Noite nas Estrelas. Todos os direitos reservados
            </Text>
          </Link>
          <Link
            href="https://wa.me/5561982107187?text=Ol%C3%A1+GouTech+Digital%2C+tenho+interesse+em+saber+mais+sobre+seu+trabalho%21"
            isExternal
            style={{ textDecoration: 'none' }}
          >
            <Text _hover={{ color: 'blue.400' }} fontSize={'small'}>
              Desenvolvido por GouTech Digital
            </Text>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
