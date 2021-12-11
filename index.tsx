import React, { Component } from 'react';
import { render } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import './style.css';

import Employees from './components/Employees';

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
  {
    id: 2,
    name: 'Mark',
    lastName: 'Antony',
    workerFrom: '2020-01-01',
    salary: 70000,
    monthlyHours: 180,
  },
];

const Container = styled.main`
`;

const App = () => {
  const theme = {
    primary: '#5342f4',
    secondary: '#4f1282',
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h4>Employees</h4>
        <Employees employees={employees} />
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
