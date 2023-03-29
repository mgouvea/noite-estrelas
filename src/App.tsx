import { Box } from '@chakra-ui/react';
import { Atividades } from './components/Atividades';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <Box>
      <Header />
      <Atividades />
      <Footer />
    </Box>
  );
}

export default App;
