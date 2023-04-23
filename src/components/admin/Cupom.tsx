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
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';

const createCupomSchema = z.object({
  ativo: z.string(),
  cupom: z.string().nonempty('O cupom é obrogatório').toUpperCase(),
  porcemCupom: z.coerce.number().nonnegative().int(),
});

type CreateCupomFormData = z.infer<typeof createCupomSchema>;

export function Cupom() {
  const [hasCupom, setHasCupom] = useState(false);
  const [idDataCupom, setIdDataCupom] = useState('');
  const [statusCupom, setStatusCupom] = useState('');
  const [isAtivo, setIsAtivo] = useState(false);
  const [cupomCodData, setCupomCodData] = useState('');
  const [cupomPorcemData, setCupomPorcemData] = useState('');

  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCupomFormData>({
    resolver: zodResolver(createCupomSchema),
  });

  const getCupons = async () => {
    await api.get('/cupons').then((resp) => {
      if (resp?.data?.length > 0) {
        // console.log(resp?.data.map((i: any) => i._id));
        setHasCupom(true);
        setIdDataCupom(resp?.data.map((i: any) => i._id));
        setStatusCupom(resp?.data.map((i: any) => i.ativo));
        setCupomCodData(resp?.data.map((i: any) => i.cupom));
        setCupomPorcemData(resp?.data.map((i: any) => i.porcemCupom));
      } else {
        setHasCupom(false);
      }
    });
  };

  useEffect(() => {
    getCupons();

    if (statusCupom == 'yes') {
      setIsAtivo(true);
    }
  }, []);

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  const titleSuccess = 'Cupom salvo com sucesso';
  const titleError = 'Não foi possível salvar o cupom';
  const descriptionSuccess = 'Seu cumpom já está válido!';
  const descriptionError = 'Ocorreu algum erro. Tente novamente mais tarde';
  const statusSuccess = 'success';
  const statusError = 'error';
  const duration = 9000;

  const putOrPost = async (hasId: boolean, myData: CreateCupomFormData) => {
    if (hasId) {
      await api
        .put(`/cupons/${idDataCupom}`, myData, { headers })
        .then(async function (response) {
          toast({
            title: 'Sucesso ',
            description: 'Seu cupom foi atualizado',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
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
        });
    } else {
      await api
        .post('/cupons', myData, { headers })
        .then(async function (response) {
          toast({
            title: 'Sucesso ',
            description: 'Seu cupom foi atualizado',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
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
        });
    }
  };

  function saveCupom(data: CreateCupomFormData) {
    console.log(data);
    putOrPost(hasCupom, data);
  }

  return (
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
            Cupom de desconto
          </Text>
          <Stack direction={'column'}>
            <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
              <FormLabel htmlFor="isChecked">Ativo:</FormLabel>
              <label htmlFor="yes">
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

              <label htmlFor="no">
                <input
                  {...register('ativo', { required: true })}
                  type="radio"
                  value="no"
                  name="ativo"
                  id="no"
                  checked={!isAtivo && isAtivo !== null}
                  onClick={() => setIsAtivo(false)}
                  style={{ marginRight: '0.3rem' }}
                />
                Não
              </label>
              {/* <Switch
                colorScheme="green"
                size="lg"
                id="isChecked"
                {...register('ativo')}
              /> */}
            </FormControl>

            <FormControl>
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
                Código:
              </Text>
              <Input
                placeholder={!!hasCupom ? cupomCodData : 'NOITE10'}
                size="md"
                type="text"
                textTransform={'uppercase'}
                {...register('cupom')}
              />
              {errors.cupom && (
                <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                  {errors.cupom.message}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
                % Desconto:
              </Text>
              <Input
                placeholder={!!hasCupom ? cupomPorcemData : '10'}
                size="md"
                type="number"
                {...register('porcemCupom')}
              />
              {errors.porcemCupom && (
                <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                  {errors.porcemCupom.message}
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
            onClick={handleSubmit(saveCupom)}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
