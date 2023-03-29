import { Box } from '@chakra-ui/react';
import { Atividades } from './components/Atividades';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Testemonials } from './components/Testemonials';
import { Timeline } from './components/Timeline';

function App() {
  return (
    <Box>
      <Header />
      <Atividades />
      <Timeline />
      <Testemonials />
      <Footer />
    </Box>
  );
}

export default App;
