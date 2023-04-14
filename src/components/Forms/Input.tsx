import React, { useMemo } from 'react';
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  FormInput,
  FormInputLabel,
  FormItemContainer,
  Row,
} from '../../styles/StyledComponents';

interface InputProps {
  register?: any;
  name?: string;
  control?: Control;
  rules?: any;
  placeholder?: string;
  label?: string;
  style?: string;
  onChangeDefault?: any;
  onChangeCustom?: any;
  onPress?: string;
  onBlur?: string;
  required?: boolean;
  width?: string;
  background?: string;
  cursor?: string;
  hasRule?: boolean;
}

const Input = ({
  register,
  name = '',
  control,
  rules,
  placeholder = '',
  label = '',
  style = '',
  onChangeDefault,
  onChangeCustom,
  onPress = '',
  onBlur = '',
  required = true,
  width = 'auto',
  background = '',
  cursor = '',
  hasRule = true,
  ...props
}: InputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name, rules });

  const renderError = useMemo(() => {
    return error && error.message ? (
      <p
        style={{
          color: error?.message ? '#F5365C' : '#000000',
          fontSize: '0.8rem',
          marginTop: '0.2rem',
        }}
      >
        {error?.message}
      </p>
    ) : null;
  }, [error]);

  return (
    <FormItemContainer width={width}>
      <FormInput
        {...props}
        background={background}
        cursor={cursor}
        onBlur={(event) => onChange(event.target.value.trimEnd())}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          if (onChangeCustom) {
            onChange(onChangeCustom(event.target.value));
          } else {
            if (onChangeDefault) onChangeDefault(event.target.value);
            onChange(event.target.value);
          }
        }}
      />
      {!hasRule ? '' : renderError}
    </FormItemContainer>
  );
};

export default Input;
