import React, { useState } from 'react';
import styled from 'styled-components';
import RangeInput from './RangeInput';
import LoanDetails from './LoanDetails';
import { lengths } from '../utils/styleRules';

const LoanSimulator = () => {
  const [loanAmount, setLoanAmount] = useState(6000);
  const [monthRange, setMonthRange] = useState(3);
  const [inputAmountValue, setInputAmountValue] = useState('6000');
  const [inputMonthValue, setInputMonthValue] = useState('3');
  const [formattedAmount, setFormattedAmount] = useState(6000);
  const [months, setMonths] = useState(3);

  const [isInputAmountDisabled, setIsInputAmountDisabled] = useState(true);
  const [isInputMonthDisabled, setIsInputMonthDisabled] = useState(true);

  const roundAmount = (amount) => {
    const integer = Math.floor(amount);
    const difference = amount - integer;
    return difference < 0.25 ? integer : difference < 0.75 ? integer + 0.50 : integer + 1;
  };

  const formatAmount = (amount) => {
    const value = roundAmount(amount);
    return parseFloat(value).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const interestRate = () => {
    if (formattedAmount <= 20000) return 0.035;
    if (formattedAmount <= 40000) return 0.032;
    if (formattedAmount <= 80000) return 0.028;
    return 0.025;
  };

  const maxTerm = () => {
    if (formattedAmount <= 20000) return 12;
    if (formattedAmount <= 40000) return 18;
    return 36;
  };

  return (
    <SimulatorContainer>
      <Inputs>
        <RangeInput
          title='Monto a solicitar'
          min={6000}
          max={120000}
          step={500}
          isMoney
          inputValue={inputAmountValue}
          rangeValue={loanAmount}
          isInputDisabled={isInputAmountDisabled}
          formatAmount={formatAmount}
          setInputValue={setInputAmountValue}
          setRangeValue={setLoanAmount}
          setIsInputDisabled={setIsInputAmountDisabled}
          setRealValue={setFormattedAmount}
        />
        <RangeInput
          title='Plazo'
          min={3}
          max={maxTerm()}
          step={3}
          isMoney={false}
          inputValue={inputMonthValue}
          rangeValue={monthRange}
          isInputDisabled={isInputMonthDisabled}
          setInputValue={setInputMonthValue}
          setRangeValue={setMonthRange}
          setIsInputDisabled={setIsInputMonthDisabled}
          setRealValue={setMonths}
        />
      </Inputs>
      <LoanDetails
        formatAmount={formatAmount}
        amount={formattedAmount}
        term={months}
        interestRate={interestRate()}
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