import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { IEmployee } from '../index';
import Employee from './Employee';
import EmployeeForm from './EmployeeForm';
import Dialog from './Dialog';

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
  box-shadow: 0 3px 0 #232323;

  &:hover {
    filter: brightness(.97);
    box-shadow: 0 2px 0 #232323;
    transform: translateY(1px);
  }
  &:active {
    filter: brightness(.9);
    box-shadow: 0 0 0 #232323;
    transform: translateY(3px);
  }
  &:disabled {
    filter: brightness(.6);
    cursor: not-allowed;
    box-shadow: 0 0 0 #232323;
    transform: translateY(3px);
  }
`;

export default function ({ employees: list }: { employees: IEmployee[] }) {
  const [employees, setEmployees] = useState(list);

  const [addEmployee, setAddEmployee] = useState(false);
  const saveAddEmployee = (employe: IEmployee) => {
    console.log({ employe });
    setEmployees([...employees, employe]);
    setAddEmployee(false);
  };
  const cancelAddEmployee = () => setAddEmployee(false);

  const initialStateDialog = {
    open: false,
    children: null,
    actions: null,
  };
  const [dialog, setDialog] = useState(initialStateDialog);

  const handleRemoveEmployee = (employeeId: number) => {
    setDialog({
      open: true,
      children: <p>Are you sure to remove this employee?</p>,
      actions: [
        { label: 'Cancel', action: () => setDialog(initialStateDialog) },
        {
          label: 'Accept',
          action: () => {
            const employeeIndex = employees.findIndex(
              (e) => e.id === employeeId
            );
            setDialog(initialStateDialog);
            setEmployees([
              ...employees.slice(0, employeeIndex),
              ...employees.slice(employeeIndex + 1),
            ]);
          },
          bgColor: 'var(--color)',
        },
      ],
    });
  };

  return (
    <Employees>
      {employees.map((e) => (
        <Employee key={e.id} employee={e} remove={handleRemoveEmployee} />
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

      <Dialog {...dialog} />
    </Employees>
  );
}
