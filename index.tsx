import React, { Component } from 'react';
import { render } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import './style.css';

const Container = styled.main`
`;

const App = () => {
  const theme = {
    palete: {
      primary: '#171282',
      secondary: '#4f1282',
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h4>Employees</h4>
        <br />
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
