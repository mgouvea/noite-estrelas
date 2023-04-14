import { cpf } from 'cpf-cnpj-validator';

export const onlyNumbers = (value: any) => {
  return value.replace(/[^0-9]/g, '');
};

export const emailMatch = {
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Entered value does not match email format.',
  },
};

export const valueIsRequired = (
  required = true,
  message = 'Campo obrigatório.'
) => {
  return {
    required: { value: required, message },
  };
};

export const validateCPF = (value: number) => {
  return cpf.isValid(onlyNumbers(value)) || 'CPF inválido';
};

export const maxLength = (value = 1) => {
  return {
    maxLength: {
      value,
      message: `Tamanho máximo: ${value}.`,
    },
  };
};

export const minLength = (value = 1) => {
  return {
    minLength: {
      value,
      message: `Tamanho mínimo: ${value}.`,
    },
  };
};

export const maxValue = (value = 1) => {
  return {
    max: {
      value,
      message: `Valor máximo: ${value}.`,
    },
  };
};

export const minValue = (value = 1) => {
  return {
    min: {
      value,
      message: `Valor mínimo: ${value}.`,
    },
  };
};

export const onlyIntegerNumbersRegex = /^\d+$/;
export const phoneNumberRegex = /^\+\d+$/;
