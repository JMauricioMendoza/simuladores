import styled from 'styled-components';
import { colors, lengths, fontSizes } from '../utils/styleRules';
import { FaEdit, FaCheckCircle } from 'react-icons/fa';

const RangeInput = ({
  min,
  max,
  step,
  title,
  isMoney,
  inputValue,
  rangeValue,
  isInputDisabled,
  formatAmount,
  setInputValue,
  setRangeValue,
  setIsInputDisabled,
  setRealValue
}) => {
  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setRangeValue(value);
    setInputValue(value);
    setRealValue(value);
  };

  const handleInput = (value) => {
    const numberValue = value.replace(/[^0-9]/g, '');
    setInputValue(numberValue);
  };

  const handleSave = () => {
    const realAmount = Math.round(Math.max(min, Math.min(inputValue, max)) / step) * step;
    setIsInputDisabled(true);
    setInputValue(realAmount);
    setRealValue(realAmount);
    setRangeValue(realAmount);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const editButton = isInputDisabled ? (
    <EditButton onClick={() => setIsInputDisabled(false)}>
      <FaEdit />
    </EditButton>
  ) : (
    <EditButton onClick={handleSave}>
      <FaCheckCircle />
    </EditButton>
  );

  return (
    <InputContainer>
      <Label>{title}:</Label>
      <AmountInputContainer>
        <Sign>{isMoney ? '$' : 'Meses'}</Sign>
        <Input
          value={!isInputDisabled || !isMoney ? inputValue : formatAmount(inputValue)}
          disabled={isInputDisabled}
          onChange={(event) => handleInput(event.target.value)}
          onKeyDown={handleKeyDown}
          $enableInput={!isInputDisabled}
          $isMoney={isMoney}
        />
        {editButton}
      </AmountInputContainer>
      <Slider
        type='range'
        min={min}
        max={max}
        step={step}
        value={rangeValue}
        onChange={handleChange}
      />
      <Description>
        <span>{isMoney ? `$ ${formatAmount(min)}` : `${min} meses`}</span>
        <span>{isMoney ? `$ ${formatAmount(max)}` : `${max} meses`}</span>
      </Description>
    </InputContainer>
  );
};

export default RangeInput;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${lengths.small.length3};
`;

const Label = styled.p`
  color: ${colors.text};
  font-size: ${fontSizes.medium};
  font-weight: 700;
  width: 100%;
`;

const AmountInputContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${lengths.small.length1};
`;

const Sign = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.medium};
`;

const Input = styled.input`
  background-color: ${({ $enableInput }) => $enableInput ? colors.disabled : colors.white};
  border: none;
  border-bottom: ${({ $enableInput }) => $enableInput ? `1px solid ${colors.green}` : `1px solid ${colors.white}`};
  color: ${({ $enableInput }) => $enableInput ? colors.text : colors.label};
  font-size: ${fontSizes.medium};
  outline: none;
  padding: 2px;
  text-align: right;
  transition: background .3s, border .3s, color .3s;
  width: ${({ $isMoney }) => $isMoney ? '100px' : '25px'};
`;

const Slider = styled.input`
  appearance: none;
  width: 100%;

  &::-webkit-slider-runnable-track {
    height: ${lengths.small.length1};
    background: ${colors.disabled};
    border: none;
    border-radius: ${lengths.small.length1};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: ${lengths.small.length2};
    width: ${lengths.small.length2};
    border-radius: 50%;
    background: ${colors.green};
    margin-top: -4px;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    color: ${colors.label};
    font-size: ${fontSizes.small};
  }
`;

const EditButton = styled.button`
  border: none;
  color: ${colors.green};
  cursor: pointer;
  display: flex;
`;