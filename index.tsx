import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import './style.css';

import db from './Db';
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
`;

const useEmployees = (initialState: IEmployee[]) => {
  const { getEmployees, getEmployee, createEmployee } = db();

  const [employees, setEmployees] = useState(initialState);
  useEffect(() => {
    const listEmployees = getEmployees();
    if (listEmployees) setEmployees([...listEmployees]);
  }, []);

  const addEmployee = (employee: IEmployee) => {
    const employeeCreated = createEmployee(employee);
    if (employeeCreated) setEmployees([...employees, { ...employeeCreated }]);
  };

  return { employees, addEmployee };
};

const App = () => {
  const theme = {
    primary: '#5342f4',
    secondary: '#4f1282',
  };

  const { employees, addEmployee } = useEmployees([]);
  console.log({ employees });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h4>Employees</h4>
        <Employees employees={employees} add={addEmployee} />
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
