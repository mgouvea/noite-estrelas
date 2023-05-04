import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Atividades } from './components/Atividades';
import { Faqs } from './components/Faqs';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { OqLevar } from './components/OqLevar';
import { Price } from './components/Price';
import { Testemonials } from './components/Testemonials';
import { Timeline } from './components/Timeline';
import { api } from './services/api';

function App() {
  const [dataEvento, setDataEvento] = useState('');
  const [inscricaoAtiva, setInscricaoAtiva] = useState('');
  const [priceChild, setPriceChild] = useState('');
  const [priceTeen, setPriceTeen] = useState('');
  const [priceAdult, setPriceAdult] = useState('');

  const getDataEvento = async () => {
    await api.get('/evento').then((resp) => {
      setDataEvento(resp?.data?.map((dt: any) => dt.data));
      setInscricaoAtiva(resp?.data?.map((dt: any) => dt.ativo));
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
    <Box>
      <Header inscricaoAtiva={inscricaoAtiva} />
      <Atividades />
      <Timeline dataEvento={dataEvento} />
      <Testemonials />
      <Price
        inscricaoAtiva={inscricaoAtiva}
        priceChild={priceChild}
        priceTeen={priceTeen}
        priceAdult={priceAdult}
      />
      <OqLevar />
      <Faqs />
      <Footer />
    </Box>
  );
}

export default App;
