import React from 'react';
import styled from 'styled-components';
import LoanSimulator from './components/LoanSimulator';
import Logo from '../src/assets/SacimexLogoBlanco.png';
import { colors, fontSizes, lengths } from './utils/styleRules';

const MainApp = () => {
  return (
    <AppContainer>
      <MainHeader>
        <LogoWrapper>
          <AppLogo src={Logo} alt='Logo Sacimex' />
        </LogoWrapper>
      </MainHeader>
      <HeaderText>GRUPAL - SACIMEX</HeaderText>
      <LoanSimulator/>
    </AppContainer>
  );
}

export default MainApp;

const AppContainer = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  width: 100%;
`;

const MainHeader = styled.header`
  background-color: ${colors.green};
  display: grid;
  height: ${lengths.medium.length3};
  place-items: center;
  width: 100%;
`;

const LogoWrapper = styled.div`
  width: ${lengths.large.length3}; 
`;

const AppLogo = styled.img`
  object-fit: cover;
  width: 100%;
`;

const HeaderText = styled.p`
  color: ${colors.green};
  font-size: ${fontSizes.large};
  font-weight: 700;
  padding: ${lengths.medium.length1} ${lengths.small.length2} 0;
  text-align: center;
`;