import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Atividades from './components/Atividades';
import Faqs from './components/Faqs';
import { Footer } from './components/Footer';
import Header from './components/Header';
import { Navbar } from './components/Navbar';
import { OqLevar } from './components/OqLevar';
import { Price } from './components/Price';
import { Testemonials } from './components/Testemonials';
import Timeline from './components/Timeline';
import { api } from './services/api';

function App() {
  const [dataEvento, setDataEvento] = useState('');
  const [inscricaoAtiva, setInscricaoAtiva] = useState('');
  const [priceChild, setPriceChild] = useState('');
  const [priceTeen, setPriceTeen] = useState('');
  const [priceAdult, setPriceAdult] = useState('');

  const refHeader = useRef(null);
  const refSobre = useRef(null);
  const refTimeline = useRef(null);
  const refFaq = useRef(null);
  const refContato = useRef(null);

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

  // const handleClick = () => {
  //   // @ts-ignore
  //   ref.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const handleHeaderClick = (click: any) => {
    console.log('handleHeaderClick', click);
    if (click === 'Início') {
      // @ts-ignore
      refHeader.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (click == 'Sobre') {
      // @ts-ignore
      refSobre.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (click == 'Cronograma') {
      // @ts-ignore
      refTimeline.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (click == 'FAQ') {
      // @ts-ignore
      refFaq.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Navbar inscricaoAtiva={inscricaoAtiva} onClickLink={handleHeaderClick} />
      <Header ref={refHeader} inscricaoAtiva={inscricaoAtiva} />
      <Atividades ref={refSobre} />
      <Timeline ref={refTimeline} dataEvento={dataEvento} />
      <Testemonials />
      <Price
        inscricaoAtiva={inscricaoAtiva}
        priceChild={priceChild}
        priceTeen={priceTeen}
        priceAdult={priceAdult}
      />
      <OqLevar />
      <Faqs ref={refFaq} />
      <Footer />
    </Box>
  );
}

export default App;
