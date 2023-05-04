import { Box } from '@chakra-ui/react';
import { Navbar } from '../Navbar';
import bgEstrelado from '../../assets/ceuEstreladoAzul.png';
import { InscricaoForm } from './InscricaoForm';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function Inscricao() {
  const [dataEvento, setDataEvento] = useState('');
  const [priceChild, setPriceChild] = useState('');
  const [priceTeen, setPriceTeen] = useState('');
  const [priceAdult, setPriceAdult] = useState('');

  const getDataEvento = async () => {
    await api.get('/evento').then((resp) => {
      setDataEvento(resp?.data?.map((dt: any) => dt.data));
    });
  };

  const getPrices = async () => {
    await api.get('/tickets').then((resp) => {
      setPriceChild(resp?.data?.map((p: any) => p.child));
      setPriceTeen(resp?.data?.map((p: any) => p.teen));
      setPriceAdult(resp?.data?.map((p: any) => p.adult));
    });
  };

  useEffect(() => {
    getDataEvento();
    getPrices();
  }, []);

  return (
    <Box
      // direction="column"
      bg="gray.100"
      bgImage={bgEstrelado}
      // bgRepeat="no-repeat"
      bgSize={'contain'}
      bgPosition="center"
      pb="2rem"
      minHeight="105vh"
      height={'auto'}
    >
      <Navbar />
      <InscricaoForm
        dataEvento={dataEvento}
        priceChild={priceChild}
        priceTeen={priceTeen}
        priceAdult={priceAdult}
      />
    </Box>
  );
}
