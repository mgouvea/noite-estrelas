import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    headings: 'Inter',
    body: 'Inter',
  },
  colors: {
    bgNavbar: '#232323',
    bgCard: '#f6f6f6',
    bgCardBlue: '#5e7589',
    blueLetter: {
      400: '#2f78ad',
      500: '#24608B',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#f6f6f6',
      },
    },
  },
});
