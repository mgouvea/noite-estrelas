import { Box } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import bgEstrelado from '../../assets/ceuEstreladoAzul.png';
import { InscricaoForm } from './InscricaoForm';

export function Inscricao() {
  return (
    <Box
      // direction="column"
      bg="gray.100"
      bgImage={bgEstrelado}
      // bgRepeat="no-repeat"
      bgSize={'contain'}
      bgPosition="center"
      pb="2rem"
      minHeight="100vh"
      height={'auto'}
    >
      <Navbar />

      <InscricaoForm />
    </Box>
  );
}
