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
  hasEnrollment: z.boolean(),
});

type CreateCupomFormData = z.infer<typeof createCupomSchema>;

export function IsActive() {
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
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            px={3}
            color={'blue.500'}
            rounded={'full'}
          >
            Inscriçao Ativa?
          </Text>
          <Stack direction={'column'}>
            <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
              <FormLabel htmlFor="isChecked">Ativo:</FormLabel>
              <Switch
                colorScheme="blue"
                size="lg"
                id="isChecked"
                {...register('hasEnrollment')}
              />
            </FormControl>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={3}>
          <Button
            // mt={10}
            w={'full'}
            bg={'blue.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
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
