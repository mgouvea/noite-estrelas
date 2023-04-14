import { Box } from '@chakra-ui/react';
import { Atividades } from './components/Atividades';
import { Faqs } from './components/Faqs';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { OqLevar } from './components/OqLevar';
import { Price } from './components/Price';
import { Testemonials } from './components/Testemonials';
import { Timeline } from './components/Timeline';

function App() {
  return (
    <Box>
      <Header />
      <Atividades />
      <Timeline />
      <Testemonials />
      <Price />
      <OqLevar />
      <Faqs />
      <Footer />
    </Box>
  );
}

export default App;
