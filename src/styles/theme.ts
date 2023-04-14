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
    bgInput: '#edf2f7',
    blueLetter: {
      400: '#2f78ad',
      500: '#24608B',
    },
    titles: {
      100: '#1baae7',
      200: '#314886',
      300: '#6B849F',
      400: '',
      500: '',
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
