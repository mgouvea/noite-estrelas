import styled from 'styled-components';

interface StyleProps {
  onPress?: any;
  src?: any;
  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  opacity?: string;
  position?: string;
  align?: string;
  columns?: string;
  fontFamily?: string;
  weight?: string;
  fontSize?: string;
  lineHeight?: string;
  margin?: string;
  padding?: string;
  textDecoration?: string;
  left?: string;
  top?: string;
  justify?: string;
  flexDirection?: string;
  gap?: string;
  disabled?: string;
  cursor?: string;
  background?: string;
  register?: any;
}

export const MainContainer = styled.div<StyleProps>`
  margin: 0 auto;
  background-color: ${(props) => props?.backgroundColor ?? '#0061C6'};
  padding: 40px;
  padding-left: 40px;
  padding-right: 40px;
`;

export const ChipContent = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  background-color: ${(props) => props?.backgroundColor ?? '#transparent'};
  border: ${(props) => props?.border ?? 'none'};
  border-radius: ${(props) => props?.borderRadius ?? '0px'};
  padding: 6px 11px;
  width: ${(props) => props?.width ?? 'auto'};
  opacity: ${(props) => props?.opacity ?? '1'};
`;

export const ChipDelete = styled.button<StyleProps>`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const MainContent = styled.div<StyleProps>`
  padding-left: 40px;
  padding-right: 40px;
`;

export const FlexDirectionRow = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props?.position};
  align-items: ${(props) => props?.align};
`;
export const GridDisplay = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: ${(props) => props?.columns};
`;

export const Title = styled.h2<StyleProps>`
  font-family: sans-serif;
  color: #fff;
  font-weight: bold;
  font-size: 36px;
  margin-left: 10px;
`;

export const Text = styled.p<StyleProps>`
  font-family: ${(props) => props?.fontFamily || 'Montserrat'};
  color: ${(props) => props?.color || '#000000'};
  font-weight: ${(props) => props?.weight || '300'};
  font-size: ${(props) => props?.fontSize || '14px'};
  line-height: ${(props) => props?.lineHeight || '17px'};
  margin: ${(props) => props?.margin || '0px'};
  padding: ${(props) => props?.padding || '0px'};
  text-decoration: ${(props) => props?.textDecoration || 'none'};
`;

export const SubTitle = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 7px;
  border-bottom: 1px solid ${(props) => props?.color ?? '#0061C6'};

  h3 {
    padding-top: 20px;
    color: ${(props) => props?.color ?? '#0061C6'};
    font-size: 1.125rem;
    font-weight: normal;
    font-family: 'Montserrat';
    padding-bottom: 5px;
    margin-top: 10px;
  }
`;

export const FormContainer = styled.form<StyleProps>`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 44px;
`;

export const FormItemContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  margin-block-end: 1.125rem;
  /* margin-block-start: 0.3rem; */
  width: ${(props) => props?.width ?? 'inherit'};
  margin-left: ${(props) => props?.left};
  margin-top: ${(props) => props?.top};
`;

export const FullWidth = styled.div<StyleProps>`
  width: -webkit-fill-available;
`;

export const Row = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-self: ${(props) => props?.align ?? 'flex-start'};
  align-items: ${(props) => props?.align ?? 'flex-start'};
  justify-content: ${(props) => props?.justify ?? 'flex-start'};
`;

export const ColumnGap = styled.div<StyleProps>`
  display: flex;
  flex-direction: ${(props) => props?.flexDirection ?? 'row'};
  column-gap: ${(props) => props?.gap};
  padding: ${(props) => props?.padding ?? '0'};
  background-color: ${(props) => props?.backgroundColor ?? 'transparent'};
  align-items: ${(props) => props?.align ?? 'flex-start'};
`;

export const FormRowFlex = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  column-gap: 18px;
`;

export const FormInputRadioContent = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const FormInputCheckboxLabel = styled.label<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 7px;
  margin-top: 4px;
`;

export const FormInputRadioRow = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  column-gap: 44px;
`;

export const FormInputLabel = styled.div<StyleProps>`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #646363;
  display: flex;
  align-self: flex-start;
`;

export const FormInputContainer = styled.div<StyleProps>`
  margin-top: 15px;
  width: ${(props) => props?.width ?? '20%'};
`;

export const FormInput = styled.input<StyleProps>`
  padding: 6px 11px;
  font-size: 14px;
  line-height: 17px;
  outline-offset: 0px;
  height: 40px;
  border-radius: 8px;
  width: ${(props) => props?.width ?? 'inherit'} !important;
  background-color: ${(props) => props?.background ?? 'none'} !important;
  cursor: ${(props) => props?.cursor ?? 'auto'} !important;
  outline-color: #296ba9;
`;
export const FormSquareSearchInput = styled.input<StyleProps>`
  padding: 6px 11px;
  font-size: 14px;
  line-height: 17px;
  outline-offset: 0px;
  width: 262px !important;
`;
export const FormTextArea = styled.textarea<StyleProps>`
  padding: 6px 11px;
  font-size: 14px;
  line-height: 17px;
  /* min-width: 25rem; */
  width: ${(props) => props?.width ?? '25.5rem'} !important;
  height: 7rem;
  resize: none;
  outline-offset: 0px;
  color: #646363;
  border-radius: 8px;
  outline-color: #296ba9;
`;

export const RadioButtonLabel = styled.label<StyleProps>`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;

export const FilterContainer = styled.div<StyleProps>`
  .results {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;

    p {
      color: #a18f8f;
      strong {
        color: #cc3467;
      }
    }
  }
`;

export const FilterClearButton = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: ${(props) => props?.color ?? '#FFFFFF'};
`;

export const FormInputRadioContainer = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
`;

export const FormInputRadio = styled.input<StyleProps>`
  z-index: 1;
  cursor: pointer;
  width: 25px !important;
  height: 25px;
  margin-right: 10px;
`;

export const FormSelect = styled.select<StyleProps>`
  width: ${(props) => props?.width ?? 'auto'};
  height: 40px;
  border-radius: 8px;
  padding: 6px 11px;
  font-size: 14px;
  line-height: 17px;
  outline-offset: 0px;
  outline-color: #296ba9;
`;

export const Button = styled.button<StyleProps>`
  background-color: ${(props) => props?.backgroundColor ?? '#0061C6'};
  color: ${(props) => props?.color ?? '#FFFFFF'};
  border-radius: 10px;
  height: 37px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0px 40px 0px 40px;
  border: none;
  cursor: pointer;
  disabled: ${(props) => props?.disabled};
`;

export const WrapperLegend = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FlexDirectionWrapper = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
`;

export const InputContent = styled.div<StyleProps>`
  padding: 0px 20px 0px 20px;
  border-bottom: 1px solid #cc3467;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    border-radius: 50px;
    width: 300px;
    background-color: #f8f8f8;
    padding: 15px;
    border: 0px;
  }
`;

export const SearchInputContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  input {
    border-radius: 50px;
    background-color: #f8f8f8;
    border: 0px;
  }
`;
export const SquareSearchInputContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  width: 16rem;
  input {
    border-radius: 6px;
    background-color: #f8f8f8;
    border: 0px;
  }
`;

export const RadioOptionFilter = styled.label<StyleProps>`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: #646363;
  margin-right: 4px;
`;

export const GridCheckout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  border: 1px solid red;
  padding-left: 1rem;
`;
export const GridCheckout1 = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  border: 1px solid red;
  padding-left: 1rem;
`;
