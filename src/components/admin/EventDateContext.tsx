import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createDateSchema = z.object({
  date: z.coerce.date().min(new Date(), { message: 'Escolha uma data futura' }),
});

type CreateDateFormData = z.infer<typeof createDateSchema>;

export function EventDateContext() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateDateFormData>({
    resolver: zodResolver(createDateSchema),
  });

  function saveDate(data: CreateDateFormData) {
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
            bg={useColorModeValue('yellow.50', 'yellow.900')}
            p={2}
            px={3}
            color={'yellow.500'}
            rounded={'full'}
          >
            Data do evento
          </Text>
          <Stack direction={'column'}>
            <Box>
              <Text textAlign={'start'} pl="0.2rem" pb="0.2rem" fontSize={'md'}>
                Proximo evento:
              </Text>
              <Input size="lg" type="date" {...register('date')} />
              {errors.date && (
                <Text color="red.400" fontSize={'sm'} pt="0.2rem">
                  {errors.date.message}
                </Text>
              )}
            </Box>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={3}>
          <Button
            // mt={10}
            w={'full'}
            bg={'yellow.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(214 158 46 / 43%)'}
            _hover={{
              bg: 'yellow.500',
            }}
            _focus={{
              bg: 'yellow.500',
            }}
            onClick={handleSubmit(saveDate)}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
