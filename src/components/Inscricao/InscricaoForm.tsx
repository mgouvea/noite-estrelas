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
  MenuItem,
  WrapItem,
  Tooltip,
  List,
  Text,
  Img,
  useBreakpointValue,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Input from '../Forms/Input';
import { valueIsRequired } from '../../utils/regex';
import { Divider } from 'antd';
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import Select from '../Forms/Select';
import TextArea from '../Forms/TextArea';
import { GiShoppingCart } from 'react-icons/gi';

import logo from '../../assets/logo.svg';
import cpSegura from '../../assets/compraSeguraMp.png';
import { GridCheckout } from '../../styles/StyledComponents';

export function InscricaoForm() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {},
  });
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'otherUsers',
  });
  const { isSubmitting } = formState;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [value, setValue] = useState(185);
  const [priceTag, setPriceTag] = useState(0);

  const [child, setChild] = useState('criança');
  const [teen, setTeen] = useState('criança/jovem');
  const [adult, setAdult] = useState('adulto');

  const submitForm = async (dataForm: any) => {
    onOpen();
    console.log('Submit', dataForm);
  };

  const Form1 = () => {
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
            Participante:
          </Heading>
        </Flex>
        <Divider />
        {/* LINHA 1 */}
        <Flex>
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
              name={`email`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Email"
            />
          </FormControl>
        </Flex>

        {/* LINHA 2 */}
        <Flex justify={'space-between'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="age" fontWeight={'normal'}>
              Idade
            </FormLabel>
            <Input
              name={`age`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Qual sua idade?"
            />
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="cpf" fontWeight={'normal'}>
              CPF
            </FormLabel>
            <Input
              name={`cpf`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="CPF"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone" fontWeight={'normal'}>
              Celular
            </FormLabel>
            <Input
              name={`phone`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="(**) ****-****"
            />
          </FormControl>
        </Flex>
      </Box>
    );
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
                ? setValue(value - 135)
                : item?.type === 'adult'
                ? setValue(value - 185)
                : '';
            }}
          />
        </Flex>
        <Divider />
        {/* LINHA 1 */}
        <Flex>
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
              name={`otherUsers.${index}.age`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Qual sua idade?"
            />
          </FormControl>
        </Flex>

        {/* LINHA 2 */}
        <Flex justify={'space-between'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="email" fontWeight={'normal'}>
              Email
            </FormLabel>
            <Input
              name={`otherUsers.${index}.email`}
              control={control}
              hasRule={false}
              // rules={{ ...valueIsRequired() }}
              placeholder="Email"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone" fontWeight={'normal'}>
              Celular
            </FormLabel>
            <Input
              name={`otherUsers.${index}.phone`}
              control={control}
              hasRule={false}
              // rules={{ ...valueIsRequired() }}
              placeholder="(**) ****-****"
            />
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
        <Flex>
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
            {/* <Input
              name={`users.${participanteIndex}.nome`}
              control={control}
              rules={{ ...valueIsRequired() }}
              placeholder="Nome Completo"
            /> */}
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
        <Flex justify={'space-between'}>
          <FormControl mr="5%">
            <FormLabel htmlFor="nome" fontWeight={'normal'}>
              Alguma observação importante?
            </FormLabel>
            <TextArea
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

  return (
    <Flex direction={!isWideVersion ? 'column' : 'row'}>
      <Box
        bg="gray.300"
        border="1px solid #1baae7"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={900}
        w={900}
        p={6}
        m="10px auto"
        as="form"
      >
        <Flex justify={'space-between'} align="center">
          <Heading
            display="inline-block"
            as="h2"
            size="xl"
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
                />
              </Tooltip>
            </WrapItem>
            <MenuList bg="#2b6cb0">
              <MenuItem
                bg="#2b6cb0"
                color="white"
                _hover={{ bg: '#1baae7' }}
                onClick={() => {
                  append({
                    name: '',
                    age: '',
                    email: '',
                    phone: '',
                    type: 'child',
                  });
                }}
              >
                Criança (0 a 4 anos)
              </MenuItem>
              <MenuItem
                bg="#2b6cb0"
                color="white"
                _hover={{ bg: '#1baae7' }}
                onClick={() => {
                  setValue(value + 135);
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
                  setValue(value + 185);
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
            fontSize="1rem"
            ml="0.5rem"
          >
            R$ {value},00
          </Badge>
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
              // isDisabled={!fields.length}
              // onClick={() => {
              //   toast({
              //     title: 'Account created.',
              //     description: "We've created your account for you.",
              //     status: 'success',
              //     duration: 3000,
              //     isClosable: true,
              //   });
              // }}
            >
              Gerar pix
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>
      <>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Pague o QR Code</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>Aguardando pagamento!</Text>
              <Text>
                Por favor não saia desta página até o pagamento ser reconhecido!
              </Text>
            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3}>
                Save
              </Button> */}
              <Button colorScheme={'red'} onClick={onClose}>
                Cancelar pix
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Flex>
  );
}
