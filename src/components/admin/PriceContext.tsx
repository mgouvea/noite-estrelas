import {
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  FormControl,
  Input,
  Flex,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createPriceSchema = z.object({
  child: z.string().nonempty('O valor é obrogatório'),
  teen: z.string().nonempty('O valor  é obrogatório'),
  adult: z.string().nonempty('O valor é obrogatório'),
});

type CreatePriceFormData = z.infer<typeof createPriceSchema>;

export function PriceContext() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePriceFormData>({
    resolver: zodResolver(createPriceSchema),
  });

  function savePrice(data: CreatePriceFormData) {
    console.log(data);
  }

  return (
    <Flex py={3}>
      <Box
        maxW={'330px'}
        w={'full'}
        height="2md"
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
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
                Criança:
              </Text>
              <Input
                placeholder="0 a 4 anos"
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
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
                Jovem:
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
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
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
            mt={'7.89rem'}
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
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
