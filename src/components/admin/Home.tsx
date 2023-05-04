import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { Cupom } from './Cupom';
import { EventDateContext } from './EventDateContext';
import { IsActive } from './IsActive';
import { PriceContext } from './PriceContext';

interface homeProps {
  nameUser: string;
}

export function Home({ nameUser }: homeProps) {
  const welcomeMessage = `Bem vindo ${nameUser.replace(/,/g, '')}`;

  return (
    <>
      <Flex>
        <Text>Home</Text>
        <Flex m="0.3rem">
          <FiChevronRight />
        </Flex>
        <Text color="orange.400">{welcomeMessage}</Text>
      </Flex>
      <Flex mt="2rem" maxW={'7xl'} px="2rem" border="1px solid red">
        <Tabs variant="enclosed" colorScheme="orange">
          <TabList>
            <Tab>Evento</Tab>
            <Tab>Preço</Tab>
            <Tab>Cupons de desconto</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box mr="3rem">
                <EventDateContext />
                {/* <IsActive /> */}
              </Box>
            </TabPanel>

            <TabPanel>
              <PriceContext />
            </TabPanel>

            <TabPanel>
              <Cupom />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
