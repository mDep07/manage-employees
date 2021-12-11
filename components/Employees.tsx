import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { IEmployee } from '../index';
import Employee from './Employee';
import EmployeeForm from './EmployeeForm';

const Employees = styled.section`
  --color: ${({ theme }) => theme.primary || '#CCC'};
  --color-2: ${({ theme }) => theme.secondary || 'blue'};
  width: 50%;
`;
const AddEmployeeButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  border: none;
  cursor: pointer;
  background-color: var(--color);
  color: white;
  font-weight: 900;
  font-size: 1rem;

  &:hover {
    filter: brightness(.97);
  }
  &:active {
    filter: brightness(.9);
  }
  &:disabled {
    filter: brightness(.6);
    cursor: not-allowed;
  }
`;

export default function ({ employees: list }: { employees: IEmployee[] }) {
  const [employees, setEmployees] = useState(list);

  const [addEmployee, setAddEmployee] = useState(true);
  const saveAddEmployee = (employe: IEmployee) => {
    console.log({ employe });
    setEmployees([...employees, employe]);
    setAddEmployee(false);
  };
  const cancelAddEmployee = () => setAddEmployee(false);

  return (
    <Employees>
      {employees.map((e) => (
        <Employee key={e.id} employee={e} />
      ))}
      {addEmployee && (
        <EmployeeForm
          employee={{
            id: 0,
            name: '',
            lastName: '',
            workerFrom: moment().format(),
            salary: 0,
            monthlyHours: 0,
          }}
          save={saveAddEmployee}
          cancel={cancelAddEmployee}
        />
      )}
      <AddEmployeeButton
        disabled={addEmployee}
        onClick={() => setAddEmployee(true)}
      >
        Add Employee
      </AddEmployeeButton>
    </Employees>
  );
}
