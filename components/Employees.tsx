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

interface ParamsEmployees {
  employees: IEmployee[];
  add: (employee: IEmployee) => void;
  edit: (employee: IEmployee) => void;
  remove: (employeeId: number) => void;
}
export default function ({ employees, add, edit, remove }: ParamsEmployees) {
  const initialState: IEmployee & {
    action: 'add' | 'edit' | '';
  } = {
    id: 0,
    name: '',
    lastName: '',
    workerFrom: moment().format(),
    salary: 0,
    monthlyHours: 0,
    action: '',
  };

  const [employee, setEmployee] = useState(initialState);
  const saveEmployee = (employee: IEmployee) => {
    if (employee.id === 0) {
      add(employee);
      setEmployee(initialState);
    } else {
      edit(employee);
      setEmployee(initialState);
    }
  };
  const cancelEmployee = () => setEmployee(initialState);

  const initialStateDialog = {
    children: null,
    actions: null,
  };
  const [dialog, setDialog] = useState(initialStateDialog);

  const handleRemoveEmployee = (employeeId: number) => {
    setDialog({
      children: <p>Are you sure to remove this employee?</p>,
      actions: [
        { label: 'Cancel', action: () => setDialog(initialStateDialog) },
        {
          label: 'Accept',
          action: () => {
            remove(employeeId);
            setDialog(initialStateDialog);
            setDialog({
              ...dialog,
              children: <p>Employee removing correctly?</p>,
            });
          },
          bgColor: 'var(--color)',
        },
      ],
    });
  };

  const handleEditEmployee = (employeeId: number) => {
    const _employee = employees.find((e) => e.id === employeeId);
    setEmployee({ ..._employee, action: 'edit' });
  };

  return (
    <Employees>
      {employees.map((e, i) => {
        if (e.id === employee.id && employee.action === 'edit') {
          return (
            <EmployeeForm
              key={e.id * 1000}
              employee={employee}
              save={saveEmployee}
              cancel={cancelEmployee}
            />
          );
        }

        return (
          <Employee
            key={e.id}
            employee={e}
            remove={handleRemoveEmployee}
            edit={handleEditEmployee}
          />
        );
      })}

      {employee.action === 'add' && (
        <EmployeeForm
          employee={employee}
          save={saveEmployee}
          cancel={cancelEmployee}
        />
      )}

      <AddEmployeeButton
        disabled={employee.action !== ''}
        onClick={() => setEmployee({ ...employee, action: 'add' })}
      >
        Add Employee
      </AddEmployeeButton>

      <Dialog {...dialog} />
    </Employees>
  );
}
