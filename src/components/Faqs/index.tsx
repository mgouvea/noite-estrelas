import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Perguntas } from './Perguntas';

import bgCeuImg from '../../assets/ceuEstreladoAzulClaro.png';
import { forwardRef } from 'react';

function Faqs({}, ref: any) {
  return (
    <SimpleGrid
      ref={ref}
      h={[null, '43.75rem']}
      bg="bgGray"
      columns={[1, 2]}
      bgImage={bgCeuImg}
      // bgRepeat={'no-repeat'}
      bgPosition="center"
      bgSize={'contain'}
    >
      <Flex direction="column">
        {/* <Heading
          mt={['3rem', '5rem']}
          mb={['2rem', null]}
          textAlign="center"
          fontSize={['2rem', '2.25rem']}
          as="h2"
          size="lg"
          bgGradient="linear(to-r, gray.100, gray.300)"
        >
          Perguntas Frequentes
        </Heading> */}
        <Heading
          display="inline-block"
          mt={['3rem', '5rem']}
          mb={['2rem', null]}
          textAlign="center"
          as="h2"
          size="2xl"
          height={'4rem'}
          bgGradient="linear(to-r, gray.100, gray.300)"
          backgroundClip="text"
        >
          Perguntas Frequentes
        </Heading>
      </Flex>
      <Flex align="center">
        <Perguntas />
      </Flex>
    </SimpleGrid>
  );
}

export default forwardRef(Faqs);
