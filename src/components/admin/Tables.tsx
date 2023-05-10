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
  Box,
  Tooltip,
  Badge,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { Divider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { BsSendCheck } from 'react-icons/bs';
import { api } from '../../services/api';
import { pixResponse } from '../../services/pixResponse';

interface otherUsersTypes {
  name: string;
  idade: string;
  email?: string;
  phone?: string;
  type: string;
}

interface User {
  name: string;
  email: string;
  age: string;
  cpf: string;
  phone: string;
  otherUsers: otherUsersTypes[];
  participou: string;
  sabendo: string;
  obs: string;
  statusPayment: string;
  idPayment: string;
  qtdInscritos: number;
}

export function Tables() {
  const [allUsers, setAllUsers] = useState([]);
  const [qtdTotal, setqtdTotal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const toast = useToast();

  const currentTime = new Date();
  const year = currentTime.getFullYear();

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const resp = await api.get('/users');
      setAllUsers(resp.data);

      const data = resp.data;
      const totalI = data
        .map((i: any) => i.qtdInscritos)
        .reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

      setqtdTotal(totalI);

      setIsLoading(false);
    } catch (e) {
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
  }, [updateTable]);

  const handleDeleteInscricao = async (inscricao: any) => {
    const idIsncricao = inscricao._id;
    await api.delete(`/users/${idIsncricao}`).then(function () {
      toast({
        title: 'Inscrição excluída com sucesso',
        description: 'Você acabou de excluir uma inscrição do evento',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setUpdateTable(!updateTable);
      onClose();
    });
  };

  const handleVerifyPayment = async (inscricao: any) => {
    if (inscricao?.statusPayment === 'pending') {
      await pixResponse
        .get(`/${inscricao.idPayment}`)
        .then(async (response) => {
          // if (response?.data?.status === 'approved') {
          if (response?.data?.status === 'pending') {
            const newDataForm = {
              ...inscricao,
              // statusPayment: response?.data?.status,
              statusPayment: 'approved',
            };
            await api
              .patch(`/users/${inscricao._id}`, newDataForm, { headers })
              .then(function () {
                setUpdateTable(!updateTable);
                toast({
                  title: 'Status',
                  description: 'O status do pagamento foi atualizado!',
                  status: 'success',
                  duration: 7000,
                  isClosable: true,
                  position: 'top-right',
                });
              })
              .catch(function (err) {
                console.log(err);
                toast({
                  title: 'Erro',
                  description: 'Ocorreu um erro, tente novamente mais tarde',
                  status: 'error',
                  duration: 7000,
                  isClosable: true,
                  position: 'top-right',
                });
              });
          } else {
            toast({
              title: 'Status',
              description: 'O pagamento não foi realizado!',
              status: 'error',
              duration: 7000,
              isClosable: true,
              position: 'top-right',
            });
          }
        });
    } else {
      toast({
        title: 'Pago',
        description: 'Essa inscrição já está paga!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
  };

  return (
    <>
      <Flex>
        <Text color="blue.400">Inscritos</Text>
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
          <Text>Quantidade de inscrições: {qtdTotal}</Text>
          <Flex w={'77rem'}>
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
                        <Th>Celular</Th>
                        <Th>CPF</Th>
                        <Th>Idade</Th>
                        <Th>Participantes</Th>
                        <Th>Já participou</Th>
                        <Th>Meio</Th>
                        <Th>Barracas</Th>
                        <Th>Quartos</Th>
                        <Th>OBS</Th>
                        <Th>Evento</Th>
                        <Th>Pagamento</Th>
                        <Th>QTD Inscritos</Th>
                        <Th>Ações</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {allUsers?.map((user: any, idx: any) => {
                        return (
                          <Tr key={idx}>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.phone}</Td>
                            <Td>{user.cpf}</Td>
                            <Td>{user.age}</Td>
                            <Td>
                              {user.otherUsers.map((i: any, index: any) => (
                                <Flex key={index} flexDirection="column">
                                  <Text>- {i.name}</Text>
                                  <Text>- {i.age} anos</Text>
                                  <Text>
                                    {i.email !== '' ? `- ${i.email}` : ''}
                                  </Text>
                                  <Text>
                                    {' '}
                                    {i.phone !== '(__) _____ ____'
                                      ? `- ${i.phone}`
                                      : ''}
                                  </Text>
                                  <Divider />
                                </Flex>
                              ))}
                            </Td>
                            <Td>{user.participou}</Td>
                            <Td>{user.sabendo}</Td>
                            <Td>{user.barraca}</Td>
                            <Td>{user.quarto}</Td>
                            <Td>{user.obs}</Td>
                            <Td>{user.dataEvento}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  user.statusPayment === 'pending'
                                    ? 'orange'
                                    : user.statusPayment === 'approved'
                                    ? 'green'
                                    : 'red'
                                }
                              >
                                {user.statusPayment === 'pending'
                                  ? 'Pendente'
                                  : user.statusPayment === 'approved'
                                  ? 'Aprovado'
                                  : 'Cancelado'}
                              </Badge>
                            </Td>
                            <Td>{user.qtdInscritos}</Td>
                            <Td
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              <Flex w="3rem" justify="space-between">
                                <Tooltip
                                  label="Deletar inscriçao"
                                  fontSize="md"
                                >
                                  <Box onClick={() => onOpen()}>
                                    <AiOutlineDelete
                                      color="#fd0000"
                                      size={23}
                                    />
                                  </Box>
                                </Tooltip>
                                <Tooltip
                                  label="Verificar pagamento"
                                  fontSize="md"
                                >
                                  <Box
                                    onClick={() => handleVerifyPayment(user)}
                                  >
                                    <BsSendCheck color="#007c00" size={23} />
                                  </Box>
                                </Tooltip>
                              </Flex>
                              <AlertDialog
                                isOpen={isOpen}
                                // @ts-ignore
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                                isCentered
                              >
                                <AlertDialogOverlay>
                                  <AlertDialogContent>
                                    <AlertDialogHeader
                                      fontSize="lg"
                                      fontWeight="bold"
                                    >
                                      Excluir inscrição
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                      Tem certeza que deseja excluir essa
                                      inscrição?
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                      {/* @ts-ignore */}
                                      <Button ref={cancelRef} onClick={onClose}>
                                        Não
                                      </Button>
                                      <Button
                                        colorScheme="red"
                                        onClick={() =>
                                          handleDeleteInscricao(user)
                                        }
                                        ml={3}
                                      >
                                        Excluir
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialogOverlay>
                              </AlertDialog>
                            </Td>
                          </Tr>
                        );
                      })}
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
