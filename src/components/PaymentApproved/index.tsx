import { Flex } from '@chakra-ui/react';

import { Details } from './Details';

interface ContentProps {
  name?: string;
  email?: string;
  phoneNumber?: string;
  number?: Array<number>;
  tickets?: number;
}

export function PaymentApproved({
  name,
  phoneNumber,
  number,
  tickets,
  email,
}: ContentProps) {
  return (
    <Flex direction="column" bg="gray.100" h="100%">
      <Details name={name} numbers={number} />
    </Flex>
  );
}
