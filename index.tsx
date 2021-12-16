import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import './style.css';

import useEmployees from './hooks/useEmployees';
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

const Container = styled.main`
  display: flex;
  gap: 10px;
  & > .container__item {
    flex: 1;
  }
`;

const App = () => {
  const theme = {
    primary: '#5342f4',
    secondary: '#4f1282',
  };

  const { employees, addEmployee, editEmployee, deleteEmployee } = useEmployees(
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="container__item">
          <h4>Employees</h4>
          <Employees
            employees={employees}
            add={addEmployee}
            edit={editEmployee}
            remove={deleteEmployee}
          />
        </div>
        <div className="container__item">
          <h4>Salaries</h4>
          <label htmlFor="">
            <input type="number" />
          </label>
        </div>
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
