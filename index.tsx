import React, { Component } from 'react';
import { render } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import './style.css';

import Employee from './components/Employee';

export interface IEmployee {
  id: number;
  name: string;
  lastName: string;
  birth?: string;
  workerFrom: string;
  salary: number;
  monthlyHours: number;
}

const employees: IEmployee[] = [
  {
    id: 1,
    name: 'Fulano',
    lastName: 'Fernandez',
    workerFrom: '2020-01-01',
    salary: 70000,
    monthlyHours: 160,
  },
];

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
        <div>
          <Employee />
          <Employee />
          <Employee />
        </div>
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
