import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useToast,
  MenuItem,
  WrapItem,
  Tooltip,
  List,
  Text,
  useBreakpointValue,
  useDisclosure,
  Badge,
  SimpleGrid,
  Image,
  useClipboard,
  Input as InputChakra,
  Img,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Input from '../Forms/Input';
import { validateCPF, valueIsRequired } from '../../utils/regex';
import { Divider } from 'antd';
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import Select from '../Forms/Select';
import TextArea from '../Forms/TextArea';
import { GiShoppingCart } from 'react-icons/gi';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { FormInput, FormItemContainer } from '../../styles/StyledComponents';
import { pix } from '../../services/pix';
import { firstName, lastName } from '../../utils/mask';

import compraSeguraMp from '../../assets/compraSeguraMp.png';
import { api } from '../../services/api';

export function InscricaoForm({
  dataEvento,
  priceChild,
  priceTeen,
  priceAdult,
}: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<any>({
    defaultValues: {
      cpf: '',
      phone: '',
    },
  });
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'otherUsers',
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const toast = useToast();
  let navigate = useNavigate();

  const [value, setValue] = useState(priceAdult[0]);
  const [hasQRPix, setHasQRPix] = useState(false);
  const [qtdInscricao, setQtdInscricao] = useState(1);

  const [inscricaoChild, setInscricaoChild] = useState(0);
  const [inscricaoTeen, setInscricaoTeen] = useState(0);
  const [inscricaoAdult, setInscricaoAdult] = useState(1);

  const [hasPix, sethasPix] = useState(false);
  const [dataQR, setDataQR] = useState();
  const [dataPastePix, setDataPastePix] = useState('');

  const [hasError, setHasError] = useState(false);

  const { hasCopied, onCopy } = useClipboard(dataPastePix);

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  };

  // let idPayment = '';
  // let statusPayment = '';

  // const handlePix = async (name: any, email: any, cpf: any) => {
  //   await pix
  //     .post(
  //       '/',
  //       {
  //         transaction_amount: value,
  //         payment_method_id: 'pix',
  //         payer: {
  //           first_name: firstName(name),
  //           last_name: lastName(name),
  //           email: email,
  //           identification: {
  //             type: 'CPF',
  //             number: cpf,
  //           },
  //         },
  //         description: 'Inscrição Noite nas Estrelas',
  //       },
  //       { headers }
  //     )
  //     .then(function (response) {
  //       setHasError(false);
  //       setPixId(response?.data?.id);
  //       idPayment = response?.data?.id;
  //       statusPayment = response?.data?.status;
  //       setDataQR(
  //         response?.data?.point_of_interaction?.transaction_data?.qr_code_base64
  //       );
  //       setDataPastePix(
  //         response?.data?.point_of_interaction?.transaction_data?.qr_code
  //       );
  //       sethasPix(true);

  //       setPaymentStatus(response?.data?.status);

  //       return response?.data.send(200);
  //     })
  //     .catch(function (error) {
  //       console.error('err', error);
  //       setHasError(true);
  //     });
  // };

  // const newFormTimeout = (data: any, status: any, id: any) => {
  //   const newDataForm = {
  //     ...data,
  //     statusPayment: status,
  //     idPayment: id,
  //     qtdInscritos: qtdInscricao,
  //   };

  //   return newDataForm;
  // };

  const submitForm = async (dataForm: any) => {
    setHasQRPix(true);

    await pix
      .post(
        '/',
        {
          transaction_amount: value,
          payment_method_id: 'pix',
          payer: {
            first_name: firstName(dataForm?.name),
            last_name: lastName(dataForm?.name),
            email: dataForm?.email,
            identification: {
              type: 'CPF',
              number: dataForm?.cpf,
            },
          },
          description: 'Inscrição Noite nas Estrelas',
        },
        { headers }
      )
      .then(async function (response) {
        setHasError(false);
        setDataQR(
          response?.data?.point_of_interaction?.transaction_data?.qr_code_base64
        );
        setDataPastePix(
          response?.data?.point_of_interaction?.transaction_data?.qr_code
        );
        sethasPix(true);

        const newDataForm = {
          ...dataForm,
          statusPayment: response?.data?.status,
          idPayment: response?.data?.id,
          qtdInscritos: qtdInscricao,
        };

        await api
          .post('/users', newDataForm, {
            headers,
          })
          .then(function () {
            setHasError(false);
            toast({
              title: 'Atenção ',
              description:
                'Sua inscrição está pré-confirmada, pague o pix para efetiva-la.',
              status: 'warning',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            });
          })
          .catch(function (err) {
            console.log(err);
            setHasError(true);
            toast({
              title: 'Erro',
              description: 'Ocorreu um erro, tente novamente mais tarde',
              status: 'error',
              duration: 7000,
              isClosable: true,
              position: 'top-right',
            });
          });

        return response?.data.send(200);
      })
      .catch(function (error) {
        console.error('err', error);
        setHasError(true);
      });
  };

  useEffect(() => {
    setValue(priceAdult[0]);
  }, [priceAdult]);

  const Form1 = () => {
    return (
      <Box>
        <Flex justify={'space-between'} align={'center'} mt="2rem">
          <Heading
            display="inline-block"
            as="h2"
            size="sm"
            bgGradient="linear(to-r, #314886, #1baae7)"
            backgroundClip="text"
          >
            Participante:
          </Heading>
        </Flex>
        <Divider />
        {/* LINHA 1 */}
        <Flex flexDirection={isWideVersion ? 'row' : 'column'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="name" fontWeight={'normal'}>
              Nome completo
            </FormLabel>
            <Input
              name={`name`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Nome Completo"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email" fontWeight={'normal'}>
              Email
            </FormLabel>
            <Input
              type="email"
              name={`email`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Email"
            />
          </FormControl>
        </Flex>

        {/* LINHA 2 */}
        <Flex
          justify={'space-between'}
          flexDirection={isWideVersion ? 'row' : 'column'}
        >
          <FormControl mr="5%">
            <FormLabel htmlFor="age" fontWeight={'normal'}>
              Idade
            </FormLabel>
            <Input
              type="number"
              name={`age`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Qual sua idade?"
            />
          </FormControl>

          <FormControl mr="5%">
            <InputMask mask="999.999.999-99">
              <FormItemContainer>
                <FormLabel htmlFor="cpf" fontWeight={'normal'}>
                  CPF
                </FormLabel>
                {/* @ts-ignore */}
                <FormInput
                  {...register('cpf', {
                    required: {
                      value: true,
                      message: 'Campo obrigatório',
                    },
                    validate: validateCPF,
                  })}
                  type="text"
                  placeholder="999.999.999-99"
                />
                {!!errors?.cpf && (
                  <p style={{ color: '#F5365C' }}>
                    {/* @ts-ignore */}
                    {errors?.cpf?.message}
                  </p>
                )}
              </FormItemContainer>
            </InputMask>
          </FormControl>

          <FormControl>
            <InputMask mask="(99) 99999 9999">
              <FormItemContainer>
                <FormLabel htmlFor="phone" fontWeight={'normal'}>
                  Celular
                </FormLabel>
                {/* @ts-ignore */}
                <FormInput
                  {...register('phone', {
                    required: {
                      value: true,
                      message: 'Campo obrigatório',
                    },
                  })}
                  type="text"
                  placeholder="(99) 99999-9999"
                />
                {!!errors?.phone && (
                  <p style={{ color: '#F5365C' }}>
                    {/* @ts-ignore */}
                    {errors?.phone?.message}
                  </p>
                )}
              </FormItemContainer>
            </InputMask>
          </FormControl>
        </Flex>
      </Box>
    );
  };

  const actionsRemoveChild = () => {
    setValue(value - priceChild[0]);
    setQtdInscricao(qtdInscricao - 1);
    setInscricaoChild(inscricaoTeen - 1);
  };
  const actionsRemoveTeen = () => {
    setValue(value - priceTeen[0]);
    setQtdInscricao(qtdInscricao - 1);
    setInscricaoTeen(inscricaoTeen - 1);
  };
  const actionsRemoveAdult = () => {
    setValue(value - priceTeen[0]);
    setQtdInscricao(qtdInscricao - 1);
    setInscricaoAdult(inscricaoAdult - 1);
  };

  const Form1Other = ({ participanteIndex, index, item }: any) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    return (
      <Box>
        <Flex justify={'space-between'} align={'center'} mt="2rem">
          <Heading
            display="inline-block"
            as="h2"
            size="sm"
            bgGradient="linear(to-r, #314886, #1baae7)"
            backgroundClip="text"
          >
            Participante {participanteIndex}:
          </Heading>
          <IconButton
            variant="outline"
            colorScheme="red"
            aria-label="deletar participante"
            // fontSize="20px"
            size="sm"
            icon={<SmallCloseIcon />}
            onClick={() => {
              remove(index);
              item?.type === 'teen'
                ? actionsRemoveTeen()
                : item?.type === 'adult'
                ? actionsRemoveAdult()
                : actionsRemoveChild();
            }}
          />
        </Flex>
        <Divider />
        {/* LINHA 1 */}
        <Flex flexDirection={isWideVersion ? 'row' : 'column'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="name" fontWeight={'normal'}>
              Nome completo
            </FormLabel>
            <Input
              name={`otherUsers.${index}.name`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Nome Completo"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="age" fontWeight={'normal'}>
              Idade
            </FormLabel>
            <Input
              type="number"
              name={`otherUsers.${index}.age`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Qual sua idade?"
            />
          </FormControl>
        </Flex>

        {/* LINHA 2 */}
        <Flex
          justify={'space-between'}
          flexDirection={isWideVersion ? 'row' : 'column'}
        >
          <FormControl mr="5%">
            <FormLabel htmlFor="email" fontWeight={'normal'}>
              Email
            </FormLabel>
            <Input
              type="email"
              name={`otherUsers.${index}.email`}
              control={control}
              hasRule={false}
              placeholder="Email"
            />
          </FormControl>

          <FormControl>
            <InputMask mask="(99) 99999 9999">
              <FormItemContainer>
                <FormLabel htmlFor="phone" fontWeight={'normal'}>
                  Celular
                </FormLabel>
                {/* @ts-ignore */}
                <FormInput
                  {...register(`otherUsers.${index}.phone`)}
                  type="text"
                  placeholder="(99) 99999-9999"
                />
              </FormItemContainer>
            </InputMask>
          </FormControl>
        </Flex>
      </Box>
    );
  };

  const options1Singluar = ['Sim, já participei', 'Não, primeira vez'];
  const options1Plural = [
    'Sim, todos nós já participamos',
    'Alguns de nós já participaram',
    'Não, nenhum de nós participou',
  ];

  const options2 = ['Roteiro Baby', 'Através de um amigo', 'Instagram'];

  const Form2 = ({ plural }: any) => {
    return (
      <Box>
        <Flex justify={'space-between'} align={'center'} mt="1rem">
          <Heading
            display="inline-block"
            as="h2"
            size="xs"
            bgGradient="linear(to-r, #314886, #1baae7)"
            backgroundClip="text"
          >
            Perguntas Gerais:
          </Heading>
        </Flex>
        <Divider />
        {/* LINHA 1 */}
        <Flex flexDirection={isWideVersion ? 'row' : 'column'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="nome" fontWeight={'normal'}>
              {plural.length
                ? 'Vocês já participaram do Noite nas Estrelas?'
                : 'Você já participou do Noite nas Estrelas?'}
            </FormLabel>
            <Select
              name="participou"
              options={plural.length ? options1Plural : options1Singluar}
              returnItem
              control={control}
              rules={{ ...valueIsRequired() }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email" fontWeight={'normal'}>
              {plural.length
                ? 'Como ficaram sabendo do Noite nas Estrelas?'
                : 'Como ficou sabendo do Noite nas Estrelas'}
            </FormLabel>
            <Select
              name="sabendo"
              options={options2}
              returnItem
              control={control}
              rules={{ ...valueIsRequired() }}
            />
          </FormControl>
        </Flex>

        {/* LINHA 2 */}
        <Flex
          justify={'space-between'}
          flexDirection={isWideVersion ? 'row' : 'column'}
        >
          <FormControl mr="5%">
            <FormLabel htmlFor="nome" fontWeight={'normal'}>
              Alguma observação importante?
            </FormLabel>
            <TextArea
              width={isWideVersion ? '25.5rem' : '20.2rem'}
              name="obs"
              control={control}
              hasRule={false}
              // rules={{ ...valueIsRequired() }}
              placeholder="Conte-nos o que precisa"
            />
          </FormControl>
        </Flex>
      </Box>
    );
  };

  const Form3 = () => {
    return (
      <Box>
        <Flex justify={'space-between'} align={'center'} mt="1rem">
          <Heading
            display="inline-block"
            as="h2"
            size="xs"
            bgGradient="linear(to-r, #314886, #1baae7)"
            backgroundClip="text"
          >
            Alugar Equipamentos:
          </Heading>
        </Flex>
        <Divider />
        {/* LINHA 1 */}
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="nome" fontWeight={'normal'}>
              Barraca
            </FormLabel>
            <Select
              name="participou"
              options={fields.length > 1 ? options1Plural : options1Singluar}
              returnItem
              control={control}
              rules={{ ...valueIsRequired() }}
            />
            {/* <Input
              name={`users.${participanteIndex}.nome`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Nome Completo"
            /> */}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email" fontWeight={'normal'}>
              {fields.length > 1
                ? 'Como ficaram sabendo do Noite nas Estrelas?'
                : 'Como ficou sabendo do Noite nas Estrelas'}
            </FormLabel>
            <Select
              name="sabendo"
              options={options2}
              returnItem
              control={control}
              rules={{ ...valueIsRequired() }}
            />
          </FormControl>
        </Flex>

        {/* LINHA 2 */}
        <Flex justify={'space-between'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="nome" fontWeight={'normal'}>
              Alguma observação importante?
            </FormLabel>
            <TextArea
              name="regrasServico"
              control={control}
              // rules={{ ...valueIsRequired() }}
              placeholder="Conte-nos o que precisa"
            />
          </FormControl>
        </Flex>
      </Box>
    );
  };

  const PixPage = () => {
    return (
      <Flex direction={!isWideVersion ? 'column' : 'row'} h="50rem">
        <Box
          bg="gray.300"
          border="1px solid #1baae7"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={900}
          w={isWideVersion ? 900 : 375}
          p={6}
          m="10px auto"
          as="form"
          mb="-2rem"
        >
          <Flex justify="center" align="center" flexDirection="column">
            <Heading
              display="inline-block"
              as="h2"
              size="lg"
              bgGradient="linear(to-r, #1baae7, #314886, #1baae7)"
              backgroundClip="text"
            >
              Resumo {qtdInscricao <= 1 ? 'da inscrição' : 'das inscrições'}
            </Heading>
            <Heading
              display="inline-block"
              as="h2"
              size="sm"
              mt="0.7rem"
              bgGradient="linear(to-r, #1baae7, #314886, )"
              backgroundClip="text"
            >
              inscrições: {qtdInscricao}
            </Heading>
          </Flex>
          <Divider />
          <SimpleGrid columns={2} spacing={10}>
            <Flex
              height="80px"
              flexDirection="column"
              justify="center"
              ml={isWideVersion ? '5rem' : ''}
              my="0.5rem"
            >
              <Text color="gray.600">Criança:</Text>
              <Text color="gray.600">Criança/Jovem:</Text>
              <Text color="gray.600">Adulto:</Text>
              <Heading
                display="inline-block"
                as="h2"
                size="md"
                mt="1.5rem"
                bgGradient="linear(to-r, #1baae7, #314886, )"
                backgroundClip="text"
              >
                Total:
              </Heading>
            </Flex>
            <Flex
              height="80px"
              flexDirection="column"
              justify="center"
              align="flex-end"
              ml={isWideVersion ? '5rem' : ''}
              my="0.5rem"
            >
              <Text color="gray.600">
                R$ {inscricaoChild * priceChild[0]},00
              </Text>
              <Text color="gray.600">R$ {inscricaoTeen * priceTeen[0]},00</Text>
              <Text color="gray.600">
                R$ {inscricaoAdult * priceAdult[0]},00
              </Text>
              <Heading
                display="inline-block"
                as="h2"
                size="md"
                mt="1.5rem"
                bgGradient="linear(to-r, #1baae7, #314886, )"
                backgroundClip="text"
              >
                R$ {value},00
              </Heading>
            </Flex>
          </SimpleGrid>
          <Divider />
          <Flex align="center" justify="center" mt="2rem">
            <Image
              w="12rem"
              src={dataQR ? `data:image/jpeg;base64,${dataQR}` : ''}
            />
          </Flex>
          {hasPix ? (
            <Flex
              direction="column"
              mb={2}
              mt="1rem"
              align="center"
              justify="center"
            >
              <Text
                fontSize={isWideVersion ? 'sm' : 'md'}
                mb="0.3rem"
                color="gray.600"
                textAlign="center"
                my="0.5rem"
              >
                {isWideVersion
                  ? 'Ou copie nosso pix e pague no seu banco!'
                  : 'Copie nossa chave pix e pague no seu banco!'}
              </Text>
              <InputChakra
                w={isWideVersion ? '25rem' : '20rem'}
                value={dataPastePix}
                isReadOnly
                outlineColor="#296ba9"
              />
              <Flex mt={isWideVersion ? '0.5rem' : ''}>
                <Button
                  onClick={onCopy}
                  ml={2}
                  w={isWideVersion ? '' : '7rem'}
                  fontSize={isWideVersion ? '' : 'md'}
                  colorScheme="blue"
                  mt={isWideVersion ? '0.5rem' : '1rem'}
                  mb={isWideVersion ? '' : '0.5rem'}
                >
                  {hasCopied ? 'Copiado' : 'Copiar'}
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  ml={2}
                  w={isWideVersion ? '' : '7rem'}
                  fontSize={isWideVersion ? '' : 'md'}
                  colorScheme="red"
                  mt={isWideVersion ? '0.5rem' : '1rem'}
                  mb={isWideVersion ? '' : '0.5rem'}
                >
                  Cancelar pix
                </Button>
              </Flex>
            </Flex>
          ) : null}
          <Flex w="100%" justify="center" pt="4rem">
            <Img w={isWideVersion ? '17rem' : '13rem'} src={compraSeguraMp} />
          </Flex>
        </Box>
      </Flex>
    );
  };

  const InscricaoPage = () => {
    return (
      <Flex
        direction={!isWideVersion ? 'column' : 'row'}
        border="1px solid red"
      >
        <Box
          bg="gray.300"
          border="1px solid #1baae7"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={900}
          w={isWideVersion ? 900 : 375}
          p={6}
          m="10px auto"
          as="form"
        >
          <Flex justify={'space-between'} align="center">
            <Heading
              display="inline-block"
              as="h2"
              size={isWideVersion ? 'xl' : 'md'}
              bgGradient="linear(to-r, #1baae7, #314886, #1baae7)"
              backgroundClip="text"
            >
              Inscrição Noite nas Estrelas
            </Heading>

            <Menu autoSelect={false}>
              <WrapItem>
                <Tooltip
                  label="Adicionar participante"
                  openDelay={200}
                  closeOnClick={false}
                  placement="left"
                  bg="#2b6cb0"
                  borderRadius={'8px'}
                  hasArrow
                  arrowSize={5}
                >
                  <MenuButton
                    isDisabled={fields.length > 4}
                    colorScheme="blue"
                    as={IconButton}
                    aria-label="Options"
                    icon={<AddIcon />}
                    variant="solid"
                    size="sm"
                    mt={isWideVersion ? '' : '0.3rem'}
                  />
                </Tooltip>
              </WrapItem>
              <MenuList bg="#2b6cb0">
                <MenuItem
                  bg="#2b6cb0"
                  color="white"
                  _hover={{ bg: '#1baae7' }}
                  onClick={() => {
                    setValue(
                      !!priceChild[0] ? value + priceChild[0] : value + 50
                    );
                    setQtdInscricao(qtdInscricao + 1);
                    setInscricaoChild(inscricaoChild + 1);
                    append({
                      name: '',
                      age: '',
                      email: '',
                      phone: '',
                      type: 'child',
                    });
                  }}
                >
                  Criança (2 a 4 anos)
                </MenuItem>
                <MenuItem
                  bg="#2b6cb0"
                  color="white"
                  _hover={{ bg: '#1baae7' }}
                  onClick={() => {
                    setValue(
                      !!priceTeen[0] ? value + priceTeen[0] : value + 135
                    );
                    setQtdInscricao(qtdInscricao + 1);
                    setInscricaoTeen(inscricaoTeen + 1);
                    append({
                      name: '',
                      age: '',
                      email: '',
                      phone: '',
                      type: 'teen',
                    });
                  }}
                >
                  Criança/Jovem (5 a 15 anos)
                </MenuItem>
                <MenuItem
                  bg="#2b6cb0"
                  color="white"
                  _hover={{ bg: '#1baae7' }}
                  onClick={() => {
                    setValue(
                      !!priceAdult[0] ? value + priceAdult[0] : value + 185
                    );
                    setQtdInscricao(qtdInscricao + 1);
                    setInscricaoAdult(inscricaoAdult + 1);
                    append({
                      name: '',
                      age: '',
                      email: '',
                      phone: '',
                      type: 'adult',
                    });
                  }}
                >
                  Adulto
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex mt="0.5rem" align={'center'}>
            <GiShoppingCart size={25} color="#1ca2df" />
            <Badge
              variant="solid"
              colorScheme="green"
              fontSize={isWideVersion ? '1rem' : '0.9rem'}
              ml="0.5rem"
            >
              R$ {value},00
            </Badge>
            <Heading
              display="inline-block"
              as="h2"
              size={isWideVersion ? 'sm' : 'xs'}
              bgGradient="linear(to-r, #314886, #1baae7)"
              backgroundClip="text"
              ml={isWideVersion ? '1rem' : '4rem'}
            >
              {!!dataEvento[0]
                ? `${moment(dataEvento[0]).format('DD/MM/YYYY')}`
                : ''}
            </Heading>
          </Flex>
          <Form1 />
          {fields.map((item, index) => (
            <List key={item.id}>
              <Form1Other
                index={index}
                participanteIndex={index + 2}
                item={item}
              />
            </List>
          ))}
          <Form2 plural={fields} />

          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleSubmit(submitForm)}
              >
                Gerar pix
              </Button>
            </Flex>
          </ButtonGroup>
        </Box>
      </Flex>
    );
  };

  return !!hasQRPix ? <PixPage /> : <InscricaoPage />;
}
