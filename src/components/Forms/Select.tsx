import React, { useCallback, useMemo } from 'react';
import { Control, useController } from 'react-hook-form';
import { formatDefaultValueSelect } from '../../utils/mask';
import {
  FormInputLabel,
  FormItemContainer,
  FormSelect,
} from '../../styles/StyledComponents';

export const DEFAULT_VALUE_SELECIONE = 'Selecione';

interface SelectProps {
  name?: any;
  control?: Control;
  rules?: any;
  label?: string;
  placeholder?: string;
  onChangeDefault?: any;
  onPress?: any;
  returnItem?: boolean;
  notRequired?: boolean;
  requiredColor?: string;
  options?: any;
  capitalize?: string;
  defaultName?: any;
  defaultValue?: any;
  containerWidth?: string;
  inputWidth?: string;
  width?: string;
  formatOptionLabel?: any;
  isLoading?: boolean;
  defaultFirstValue?: string;
}

const Select = ({
  name,
  control,
  rules,
  label,
  placeholder,
  onChangeDefault,
  onPress,
  returnItem,
  notRequired = false,
  requiredColor = '#0061C6',
  options,
  capitalize,
  defaultName,
  defaultValue,
  containerWidth,
  inputWidth,
  width = 'auto',
  formatOptionLabel,
  isLoading = false,
  defaultFirstValue = DEFAULT_VALUE_SELECIONE,
  ...props
}: SelectProps) => {
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

  // const capitalizeText = useCallback(
  //   (option: any) => {
  //     const optionProperty =
  //       typeof option?.nome === 'object'
  //         ? JSON.stringify(option?.nome)
  //         : option[defaultName] || option?.nome || option;
  //     if (formatOptionLabel) {
  //       return formatOptionLabel(optionProperty);
  //     }
  //     if (capitalize) {
  //       return formatDefaultValueSelect(optionProperty);
  //     }
  //     return optionProperty;
  //   },
  //   [capitalize, formatOptionLabel, defaultName]
  // );

  const renderOptions = useMemo(() => {
    return options?.map((option: any, idx: any) => (
      <option
        key={`${idx}`}
        value={
          (returnItem && JSON.stringify(option)) ||
          option[defaultValue] ||
          option.id ||
          option
        }
        title={option?.nome || option[defaultName] || option}
      >
        {option}
      </option>
    ));
  }, [defaultName, defaultValue, options, returnItem]);

  return (
    <FormItemContainer width={width}>
      <FormSelect
        {...props}
        value={typeof value === 'object' ? JSON.stringify(value) : value}
        placeholder={placeholder}
        onChange={(event) => {
          if (onChangeDefault) onChangeDefault(event.target.value);
          onChange(event.target.value);
        }}
      >
        <option value={''}>
          {isLoading ? 'Carregando informações....' : defaultFirstValue}
        </option>
        {!isLoading && renderOptions}
      </FormSelect>

      {renderError}
    </FormItemContainer>
  );
};

export default Select;
