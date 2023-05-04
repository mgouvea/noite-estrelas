import React from 'react';
import { Control, useController } from 'react-hook-form';
import {
  FormInputLabel,
  FormItemContainer,
  FormTextArea,
} from '../../styles/StyledComponents';

interface TextAreaProps {
  name: string;
  control?: Control;
  rules?: any;
  placeholder?: string;
  style?: string;
  disabled?: string;
  onChangeDefault?: any;
  onPress?: any;
  notRequired?: boolean;
  requiredColor?: string;
  hasRule?: boolean;
  width?: string;
}

const TextArea = ({
  name,
  control,
  rules,
  placeholder,
  style,
  disabled,
  onChangeDefault,
  onPress,
  notRequired = false,
  requiredColor = '#0061C6',
  hasRule = true,
  width,
  ...props
}: TextAreaProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name, rules });

  const renderError = () =>
    error && error.message ? (
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

  return (
    <FormItemContainer>
      <FormTextArea
        {...props}
        value={value}
        width={width}
        placeholder={placeholder}
        onChange={(event) => {
          if (onChangeDefault) onChangeDefault(event.target.value);
          onChange(event.target.value);
        }}
        maxLength={140}
      />
      {!hasRule ? '' : renderError()}
    </FormItemContainer>
  );
};

export default TextArea;
