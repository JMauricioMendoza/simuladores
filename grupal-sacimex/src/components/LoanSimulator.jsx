import React, { useState } from 'react';
import styled from 'styled-components';
import RangeInput from './RangeInput';
import LoanDetails from './LoanDetails';
import { colors, lengths, fontSizes } from '../utils/styleRules';

const LoanSimulator = () => {
  const [loanTerm, setLoanTerm] = useState(4);
  const [loanCycle, setLoanCycle] = useState(1);
  const [loanAmount, setLoanAmount] = useState(3000);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [inputValue, setInputValue] = useState('3000');
  const [formattedAmount, setFormattedAmount] = useState(3000);

  const formatAmount = (amount) => {
    let value = roundAmount(amount);
    return parseFloat(value).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const roundAmount = (amount) => {
    let integer = Math.floor(amount);
    let difference = amount - integer;

    if (difference < 0.25) return integer;
    else if (difference < 0.75) return integer + 0.50;
    else return integer + 1;
  };

  return (
    <SimulatorContainer>
      <Inputs>
        <RangeInput
          title='Monto a solicitar'
          min={3000}
          max={70000}
          step={500}
          isMoney
          inputValue={inputValue}
          rangeValue={loanAmount}
          isInputDisabled={isInputDisabled}
          formatAmount={formatAmount}
          setInputValue={setInputValue}
          setRangeValue={setLoanAmount}
          setIsInputDisabled={setIsInputDisabled}
          setRealValue={setFormattedAmount}
        />
        <InputContainer>
          <LabelStyled>Plazo:</LabelStyled>
          <RadioButtons>
            {[4, 5, 6].map(months => (
              <ButtonStyled
                key={months}
                $active={loanTerm === months}
                onClick={() => setLoanTerm(months)}
              >
                {months} meses
              </ButtonStyled>
            ))}
          </RadioButtons>
        </InputContainer>
        <InputContainer>
          <LabelStyled>Ciclo:</LabelStyled>
          <RadioButtons>
            {[1, 2, 3].map(cycle => (
              <ButtonStyled
                key={cycle}
                $active={loanCycle === cycle}
                onClick={() => setLoanCycle(cycle)}
              >
                {cycle * 2 - 1} y {cycle * 2}
              </ButtonStyled>
            ))}
          </RadioButtons>
        </InputContainer>
      </Inputs>
      <LoanDetails
        formatAmount={formatAmount}
        amount={formattedAmount}
        term={loanTerm}
        cycle={loanCycle}
      />
    </SimulatorContainer>
  );
};

export default LoanSimulator;

const SimulatorContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${lengths.medium.length2};
  padding: ${lengths.medium.length1} ${lengths.small.length2};
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${lengths.medium.length2};
  width: 300px;
`;

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${lengths.small.length3};
`;

const LabelStyled = styled.p`
  color: ${colors.text};
  font-size: ${fontSizes.medium};
  font-weight: 700;
  width: 100%;
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonStyled = styled.button`
  background: none;
  border: 2px solid ${({ $active }) => $active? colors.yellow : colors.disabled};
  border-radius: 5px;
  color: ${colors.label};
  cursor: pointer;
  font-size: ${fontSizes.small};
  padding: ${lengths.small.length1} ${lengths.small.length2};
  transition: border .3s;
`;