import {
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  Input,
  RadioGroup,
  Radio,
  useToast,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Flex,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { valueIsRequired } from '../../utils/regex';
import moment from 'moment';

const createDataEventoSchema = z.object({
  ativo: z.string(),
  data: z.string().nonempty('A data é obrogatória'),
});

type CreateDataEventoForm = z.infer<typeof createDataEventoSchema>;

export function EventDateContext() {
  const [hasDataEvento, setHasDataEvento] = useState(false);
  const [idDataEvento, setIdDataEvento] = useState('');
  const [statusDataEvento, setStatusDataEvento] = useState('');
  const [isAtivo, setIsAtivo] = useState(false);
  const [eventoInfo, setEventoInfo] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateDataEventoForm>({
    resolver: zodResolver(createDataEventoSchema),
  });

  const getDataEvento = async () => {
    await api.get('/evento').then((resp) => {
      setEventoInfo(resp?.data);
      if (resp?.data?.length > 0) {
        // console.log(resp?.data.map((i: any) => i._id));
        setHasDataEvento(true);
        setIdDataEvento(resp?.data.map((i: any) => i._id));
        setStatusDataEvento(resp?.data.map((i: any) => i.ativo));
      } else {
        setHasDataEvento(false);
      }
    });
  };

  useEffect(() => {
    getDataEvento();

    if (statusDataEvento == 'yes') {
      setIsAtivo(true);
    }
  }, [updateTable]);

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const putOrPost = async (hasId: boolean, myData: CreateDataEventoForm) => {
    setIsLoading(true);
    if (hasId) {
      await api
        .put(`/evento/${idDataEvento}`, myData, { headers })
        .then(async function (response) {
          setUpdateTable(!updateTable);
          toast({
            title: 'Sucesso ',
            description: 'As informações do evento foram atualizadas',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
        })
        .catch(function (error) {
          toast({
            title: 'Erro',
            description: 'Ocorreu um erro. Tente novamente mais tarde!',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          console.error('err', error);
          setIsLoading(false);
        });
    } else {
      await api
        .post('/evento', myData, { headers })
        .then(async function (response) {
          setUpdateTable(!updateTable);
          toast({
            title: 'Sucesso ',
            description: 'As informações do evento foram atualizadas',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
        })
        .catch(function (error) {
          toast({
            title: 'Erro',
            description: 'Ocorreu um erro. Tente novamente mais tarde!',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          console.error('err', error);
          setIsLoading(false);
        });
    }
  };

  function saveDataEvento(data: CreateDataEventoForm) {
    console.log('saveDataEvento', data);
    putOrPost(hasDataEvento, data);
  }

  const handleDeleteEvento = async (ev: any) => {
    const idEvento = ev._id;
    await api.delete(`/evento/${idEvento}`).then(function () {
      setUpdateTable(!updateTable);
      toast({
        title: 'Sucesso',
        description: 'Evento Deletado com sucesso!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    });
  };

  return (
    <Flex justify="space-around" w="75rem">
      <Center py={3}>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Stack
            textAlign={'center'}
            p={3}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}
          >
            <Text
              fontSize={'md'}
              fontWeight={500}
              bg={useColorModeValue('green.50', 'green.900')}
              p={2}
              px={3}
              color={'green.500'}
              rounded={'full'}
            >
              Informações do Evento
            </Text>
            <Stack direction={'column'}>
              <FormControl as={Flex} px="0.2rem">
                <FormLabel htmlFor="isChecked" color="gray.700">
                  Habilitar inscrição:
                </FormLabel>
                {/* <RadioOrCheckboxGroup
                  title="Vai usar um diagnóstico?"
                  name="diagnosticos"
                  control={control}
                  rules={{ ...valueIsRequired() }}
                  values={[
                    {
                      placeholder: 'Sim',
                      value: 'yes',
                    },
                    {
                      placeholder: 'Não',
                      value: 'no',
                    },
                  ]}
                /> */}
                <label htmlFor="yes" style={{ marginRight: '0.5rem' }}>
                  <input
                    {...register('ativo', { required: true })}
                    type="radio"
                    value="yes"
                    name="ativo"
                    id="yes"
                    checked={isAtivo}
                    onClick={() => setIsAtivo(true)}
                    style={{ marginRight: '0.3rem' }}
                  />
                  Sim
                </label>

                <label htmlFor="no" style={{ marginLeft: '0.5rem' }}>
                  <input
                    {...register('ativo', { required: true })}
                    type="radio"
                    value="no"
                    name="ativo"
                    id="no"
                    checked={!isAtivo}
                    onClick={() => setIsAtivo(false)}
                    style={{ marginRight: '0.3rem' }}
                  />
                  Não
                </label>
              </FormControl>

              <FormControl>
                <Text
                  textAlign={'start'}
                  pl="0.2rem"
                  pb="0.2rem"
                  fontSize={'md'}
                >
                  Data do evento:
                </Text>
                <Input
                  size="md"
                  type="date"
                  textTransform={'uppercase'}
                  {...register('data')}
                />
                {errors.data && (
                  <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                    {errors.data.message}
                  </Text>
                )}
              </FormControl>
            </Stack>
          </Stack>

          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={3}>
            <Button
              // mt={10}
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}
              onClick={handleSubmit(saveDataEvento)}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Center>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <TableCaption>Evento</TableCaption>
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Inscrição Ativa</Th>
            </Tr>
          </Thead>
          {eventoInfo?.map((i: CreateDataEventoForm, index: any) => (
            <Tbody key={index}>
              <Tr>
                <Td textAlign={'center'}>
                  {moment(i.data).format('DD-MM-YYYY')}
                </Td>
                <Td textAlign={'center'}>
                  {i.ativo === 'yes' ? 'Sim' : 'Não'}
                </Td>
                <Td
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteEvento(i)}
                >
                  <AiOutlineDelete color="#fd0000" size={20} />
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </Flex>
  );
}
