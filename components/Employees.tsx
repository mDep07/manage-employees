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

  const initialStateAddEditEmployee: IEmployee & {
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

  const [addEditEmployee, setAddEditEmployee] = useState(
    initialStateAddEditEmployee
  );
  const saveEmployee = (employee: IEmployee) => {
    if (employee.id === 0) {
      setEmployees([...employees, employee]);
      setAddEditEmployee(initialStateAddEditEmployee);
    }
  };
  const cancelAddEmployee = () =>
    setAddEditEmployee(initialStateAddEditEmployee);

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
            const employeeIndex = employees.findIndex(
              (e) => e.id === employeeId
            );
            setDialog(initialStateDialog);
            setEmployees([
              ...employees.slice(0, employeeIndex),
              ...employees.slice(employeeIndex + 1),
            ]);

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
    const employee = employees.find((e) => e.id === employeeId);
    setAddEditEmployee({ ...addEditEmployee, action: 'edit', ...employee });
  };

  return (
    <Employees>
      {employees.map((e) => {
        if (e.id === addEditEmployee.id && addEditEmployee.action === 'edit') {
          return (
            <EmployeeForm
              employee={addEditEmployee}
              save={saveEmployee}
              cancel={cancelAddEmployee}
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

      {addEditEmployee.action === 'add' && (
        <EmployeeForm
          employee={addEditEmployee}
          save={saveEmployee}
          cancel={cancelAddEmployee}
        />
      )}

      <AddEmployeeButton
        disabled={addEditEmployee.action !== ''}
        onClick={() =>
          setAddEditEmployee({ ...addEditEmployee, action: 'add' })
        }
      >
        Add Employee
      </AddEmployeeButton>

      <Dialog {...dialog} />
    </Employees>
  );
}
