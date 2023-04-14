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
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createCupomSchema = z.object({
  ativo: z.boolean(),
  cupom: z.string().nonempty('O cupom é obrogatório'),
});

type CreateCupomFormData = z.infer<typeof createCupomSchema>;

export function Cupom() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCupomFormData>({
    resolver: zodResolver(createCupomSchema),
  });

  function saveCupom(data: CreateCupomFormData) {
    console.log(data);
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
              <Switch
                colorScheme="green"
                size="lg"
                id="isChecked"
                {...register('ativo')}
              />
            </FormControl>

            <FormControl>
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
                Código:
              </Text>
              <Input
                placeholder="NOITE10"
                size="md"
                type="text"
                {...register('cupom')}
              />
              {errors.cupom && (
                <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                  {errors.cupom.message}
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
