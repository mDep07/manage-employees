import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Formik, Field, Form, FormikHelpers } from 'formik';

import { IEmployee } from '../index';
import Employee from './Employee';

const Employees = styled.section`
  --color: ${({ theme }) => theme.primary || '#CCC'};
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

const AddEmployeeForm = styled(Form)`
`;
const AddEmployeeField = styled(Field)`
`;

type AddNewEmployeeParams = {
  save: Function;
  cancel: Function;
  employeeEdit?: IEmployee;
};
const AddNewEmployee = ({
  save,
  cancel,
  employeeEdit,
}: AddNewEmployeeParams) => {
  const initialValues: IEmployee = {
    id: 0,
    name: '',
    lastName: '',
    workerFrom: moment().format(),
    salary: 0,
    monthlyHours: 0,
  };
  //const [employee, setEmployee] = useState(employeeEdit ? employeeEdit : initialState);

  return (
    <Formik
      initialValues={employeeEdit ? employeeEdit : initialValues}
      validate={(values: IEmployee) => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        save(values);
        setSubmitting(false);
      }}
      onReset={() => cancel()}
    >
      <AddEmployeeForm>
        <Field id="name" name="name" type="text" placeholder="Name" />
        <Field
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
        />
        <Field
          id="birth"
          name="birth"
          type="date"
          placeholder={new Date().toString()}
        />
        <Field
          id="workerFrom"
          name="workerFrom"
          type="date"
          placeholder={new Date().toString()}
        />
        <Field id="salary" name="salary" type="number" placeholder="0" />
        <Field
          id="monthlyHours"
          name="monthlyHours"
          type="number"
          placeholder="0"
        />
        <button type="submit">Save</button>
        <button type="reset">Cancel</button>
      </AddEmployeeForm>
    </Formik>
  );
};

export default function ({ employees }: { employees: IEmployee[] }) {
  const [addEmployee, setAddEmployee] = useState(false);
  const saveAddEmployee = (employe: IEmployee) => {
    console.log({ employe });
    setAddEmployee(false);
  };
  const cancelAddEmployee = () => setAddEmployee(false);

  return (
    <Employees>
      {employees.map((e) => (
        <Employee key={e.id} employee={e} />
      ))}
      {addEmployee && (
        <AddNewEmployee save={saveAddEmployee} cancel={cancelAddEmployee} />
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
