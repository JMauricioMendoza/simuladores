import React from 'react';
import styled from 'styled-components';
import { colors, lengths, fontSizes } from '../utils/styleRules';
import rdFactorData from '../utils/rdFactor.json';

const LoanDetails = ({ formatAmount, amount, term, interestRate }) => {
  const days = term * 30;
  const rdFactor = rdFactorData[days];
  const iva = 0.16;
  const monthlyInterestRate = interestRate * (1 + iva);
  const monthlyPayment = (amount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), term))/(Math.pow((1 + monthlyInterestRate), term) - 1);
  const totalPayment = monthlyPayment * term;
  const paymentPerThousand = (1000 * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), term))/(Math.pow((1 + monthlyInterestRate), term) - 1);
  const lifeInsurance = amount * rdFactor * days / 1000;
  const guarantee = amount * 0.10;
  const netAmount = amount - lifeInsurance - guarantee - 25;

  return (
    <LoanDetailsContainer>
      <DetailItem>Monto solicitado:</DetailItem>
      <DetailValue>${formatAmount(amount)}</DetailValue>
      <DetailItem>Cobertura de riesgo:</DetailItem>
      <DetailValue $red>${formatAmount(lifeInsurance)}</DetailValue>
      <DetailItem>Consulta SIC:</DetailItem>
      <DetailValue $red>-$25.00</DetailValue>
      <DetailItem>Garantía líquida:</DetailItem>
      <DetailValue $red>${formatAmount(guarantee)}</DetailValue>
      <DetailItem>Monto a entregar:</DetailItem>
      <DetailValue>${formatAmount(netAmount)}</DetailValue>
      <DetailItem>Plazo:</DetailItem>
      <DetailValue>{term} meses</DetailValue>
      <DetailItem>Tasa mensual:</DetailItem>
      <DetailValue>{(interestRate * 100).toFixed(2)}%</DetailValue>
      <DetailItem>Pago mensual por cada $1000:</DetailItem>
      <DetailValue>${formatAmount(paymentPerThousand)}</DetailValue>
      <DetailItem>Pago mensual:</DetailItem>
      <DetailValue>${formatAmount(monthlyPayment)}</DetailValue>
      <DetailItem>Pago total:</DetailItem>
      <DetailValue>${formatAmount(totalPayment)}</DetailValue>
    </LoanDetailsContainer>
  );
};

export default LoanDetails;

const LoanDetailsContainer = styled.div`
  border: 1px solid ${colors.label};
  border-radius: ${lengths.small.length1};
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: ${lengths.small.length2};
  grid-template-columns: repeat(2, 150px);
  grid-template-rows: repeat(10, auto);
  padding: ${lengths.small.length2};
  width: 300px;
`;

const DetailItem = styled.p`
  align-self: end;
  color: ${colors.label};
  font-size: ${fontSizes.small};
`;

const DetailValue = styled.p`
  align-self: end;
  color: ${({ $red }) => $red ? '#CC0000' : colors.green};
  font-size: ${fontSizes.small};
  font-weight: 700;
`;