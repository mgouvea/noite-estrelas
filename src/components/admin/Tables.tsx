import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  luckyNumber: number[];
}

export function Tables() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const toast = useToast();

  const currentTime = new Date();
  const year = currentTime.getFullYear();

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const resp = await api.get('/users');
      setAllUsers(resp.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      toast({
        title:
          'Ocorreu um erro ao buscar os dados! Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Flex>
        <Text>Inscritos</Text>
        <Flex m="0.3rem">
          <FiChevronRight />
        </Flex>
      </Flex>
      <Container maxW={'5xl'} mt="-5rem">
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
            lineHeight={'110%'}
          >
            Veja quem{' '}
            <Text as={'span'} color={'teal.400'}>
              está participando
            </Text>
          </Heading>
          <Flex w={'full'}>
            <TableContainer w="100%">
              <Table variant="striped" colorScheme={'blackAlpha'}>
                <TableCaption>Noite nas Estrelas {year}</TableCaption>

                {isLoading ? (
                  <Flex justify={'center'}>
                    <Spinner
                      thickness="2px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Flex>
                ) : (
                  <>
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>Indicado por</Th>
                        <Th>Celular</Th>
                        <Th isNumeric>Números</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {allUsers.map((user: any, idx: any) => (
                        <Tr key={idx}>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.indicacao}</Td>
                          <Td>{user.phone}</Td>
                          <Flex flexDirection={'column'}>
                            {user.luckyNumber.map((item: number) => (
                              <Td isNumeric>{item}</Td>
                            ))}
                          </Flex>
                        </Tr>
                      ))}
                    </Tbody>
                  </>
                )}
              </Table>
            </TableContainer>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}