import {
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  FormControl,
  Input,
  Flex,
  useToast,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';

const createPriceSchema = z.object({
  child: z.coerce.number().nonnegative().int(),
  teen: z.coerce.number().nonnegative().int(),
  adult: z.coerce.number().nonnegative().int(),
});

type CreatePriceFormData = z.infer<typeof createPriceSchema>;

export function PriceContext() {
  const toast = useToast();
  const [hasPrice, setHasPrice] = useState(false);
  const [idDataPrice, setIdDataPrice] = useState('');
  const [allPrices, setAllPrices] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePriceFormData>({
    resolver: zodResolver(createPriceSchema),
  });

  const getPrices = async () => {
    await api.get('/tickets').then((resp) => {
      setAllPrices(resp?.data);
      if (resp?.data.length > 0) {
        setHasPrice(true);
        setIdDataPrice(resp?.data.map((i: any) => i._id));
      } else {
        setHasPrice(false);
      }
    });
  };

  useEffect(() => {
    getPrices();
  }, [updateTable]);

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const putOrPost = async (hasId: boolean, myData: CreatePriceFormData) => {
    setIsLoading(true);
    if (hasId) {
      await api
        .put(`/tickets/${idDataPrice}`, myData, { headers })
        .then(async function (response) {
          setUpdateTable(!updateTable);
          toast({
            title: 'Preço salvo com sucesso',
            description: 'Você acabou de atualizar os preços do evento',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
        })
        .catch(function (error) {
          console.error('err', error);
        });
    } else {
      await api
        .post('/tickets', myData, { headers })
        .then(async function (response) {
          setUpdateTable(!updateTable);
          toast({
            title: 'Preço salvo com sucesso',
            description: 'Você acabou de atualizar os preços do evento',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
        })
        .catch(function (error) {
          console.error('err', error);
        });
    }
  };

  async function savePrice(data: CreatePriceFormData) {
    if (data.teen === 0 || data.adult === 0) {
      toast({
        title: 'Preencha corretamente os campos',
        description: 'Verifique se você preencheu todos os campos corretamente',
        status: 'warning',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
      });
      return;
    }

    putOrPost(hasPrice, data);
  }

  const handleDeletePrices = async (prices: any) => {
    const idPrices = prices._id;
    await api.delete(`/tickets/${idPrices}`).then(function () {
      toast({
        title: 'Preço excluído com sucesso',
        description: 'Você acabou de excluir os preços do evento',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      setUpdateTable(!updateTable);
    });
  };

  return (
    <Flex w="75rem" justify="space-evenly">
      <Center py={3}>
        <Box
          maxW={'330px'}
          w={'full'}
          mb="0.5rem"
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
              Valor ingresso
            </Text>
            <Stack direction={'column'}>
              <FormControl>
                <Text
                  textAlign={'start'}
                  pl="0.2rem"
                  pb="0.2rem"
                  fontSize={'md'}
                >
                  Criança:
                </Text>
                <Input
                  placeholder="2 a 4 anos"
                  size="md"
                  type="number"
                  {...register('child')}
                />
                {errors.child && (
                  <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                    {errors.child.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <Text
                  textAlign={'start'}
                  pl="0.2rem"
                  pb="0.2rem"
                  fontSize={'md'}
                >
                  Criança / Jovem:
                </Text>
                <Input
                  placeholder="5 a 15 anos"
                  size="md"
                  type="number"
                  {...register('teen')}
                />
                {errors.teen && (
                  <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                    {errors.teen.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <Text
                  textAlign={'start'}
                  pl="0.2rem"
                  pb="0.2rem"
                  fontSize={'md'}
                >
                  Adulto:
                </Text>
                <Input
                  placeholder="acima de 15 anos"
                  size="md"
                  type="number"
                  {...register('adult')}
                />
                {errors.adult && (
                  <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                    {errors.adult.message}
                  </Text>
                )}
              </FormControl>
            </Stack>
          </Stack>

          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={3}>
            <Button
              // mt={'12.6rem'}
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
              onClick={handleSubmit(savePrice)}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Center>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <TableCaption>Meus Cupons</TableCaption>
          <Thead>
            <Tr>
              <Th>Criança</Th>
              <Th>Jovem</Th>
              <Th>Adulto</Th>
              <Th>Açoes</Th>
            </Tr>
          </Thead>
          {allPrices?.map((i: CreatePriceFormData, index: any) => (
            <Tbody key={index}>
              <Tr>
                <Td textAlign={'center'}>R$ {i.child}</Td>
                <Td textAlign={'center'}>R$ {i.teen}</Td>
                <Td textAlign={'center'}>R$ {i.adult}</Td>
                <Td
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeletePrices(i)}
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
