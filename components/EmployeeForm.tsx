import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Formik, Field, Form, FormikHelpers, FormikErrors } from 'formik';

import { IEmployee } from '../index';

const AddEmployeeForm = styled(Form)`
  padding: 5px;
  background-color: var(--color);
  margin-bottom: 5px;
`;

const AddEmployeeFormControl = styled.div`
  margin-bottom: 5px;
`;
const AddEmployeeField = styled(Field)`
  font-size: 1rem;
  padding: 10px 5px;
  display: block;
  width: 100%;
  background-color: white;
  border: none;
  color: black;
  ${({ error }) => (error ? 'border-bottom: 2px solid red;' : '')}
`;
const AddEmployeeFieldError = styled.div`
  display: inline-block;
  font-size: .8rem;
  background-color: red;
  color: white;
  padding: 2px 6px;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 10px;
  background-color: ${({ color }) => color};
  border: none;
  color: #fff;
  cursor: pointer;
  min-width: 40%;
  margin: 0 4px;
  box-shadow: 0 3px 0 #232323;
  margin-bottom: 3px;
  &:hover {
    box-shadow: 0 2px 0 #232323;
    transform: translateY(1px);
  }
  &:active {
    box-shadow: 0 0 0 #232323;
    transform: translateY(3px);
  }
`;
type Params = { employee: IEmployee; save: Function; cancel: Function };
export default function ({ employee, save, cancel }: Params) {
  return (
    <Formik
      initialValues={employee}
      validate={(values) => {
        const errors: FormikErrors<IEmployee> = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.lastName) {
          errors.lastName = 'Required';
        }
        if (!values.salary) {
          errors.salary = 'Required';
        } else {
          if (values.salary < 0) {
            errors.salary = 'Salary must be greater than 0';
          }
        }
        if (!values.monthlyHours) {
          errors.monthlyHours = 'Required';
        } else {
          if (values.monthlyHours < 0) {
            errors.monthlyHours = 'Monthly Hours must be greater than 0';
          }
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        save(values);
        setSubmitting(false);
      }}
      onReset={() => cancel()}
    >
      {({ touched, errors, isSubmitting }) => (
        <AddEmployeeForm>
          <input id="id" name="id" type="hidden" />
          <AddEmployeeFormControl>
            <AddEmployeeField
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              error={errors.name && touched.name}
            />
            {errors.name && touched.name && (
              <AddEmployeeFieldError>{errors.name}</AddEmployeeFieldError>
            )}
          </AddEmployeeFormControl>
          <AddEmployeeFormControl>
            <AddEmployeeField
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              error={errors.name && touched.name}
            />
            {errors.lastName && touched.lastName && (
              <AddEmployeeFieldError>{errors.lastName}</AddEmployeeFieldError>
            )}
          </AddEmployeeFormControl>

          <AddEmployeeFormControl>
            <AddEmployeeField
              id="birth"
              name="birth"
              type="date"
              placeholder={new Date().toString()}
            />
          </AddEmployeeFormControl>

          <AddEmployeeFormControl>
            <AddEmployeeField
              id="workerFrom"
              name="workerFrom"
              type="date"
              placeholder={new Date().toString()}
            />
          </AddEmployeeFormControl>

          <AddEmployeeFormControl>
            <AddEmployeeField
              id="salary"
              name="salary"
              type="number"
              placeholder="0"
              error={errors.name && touched.name}
            />
            {errors.salary && touched.salary && (
              <AddEmployeeFieldError>{errors.salary}</AddEmployeeFieldError>
            )}
          </AddEmployeeFormControl>

          <AddEmployeeFormControl>
            <AddEmployeeField
              id="monthlyHours"
              name="monthlyHours"
              type="number"
              placeholder="0"
              error={errors.name && touched.name}
            />
            {errors.monthlyHours && touched.monthlyHours && (
              <AddEmployeeFieldError>
                {errors.monthlyHours}
              </AddEmployeeFieldError>
            )}
          </AddEmployeeFormControl>

          <div style={{ textAlign: 'center' }}>
            <Button color="#009e49" type="submit">
              Save
            </Button>
            <Button color="#c2c2c2" type="reset">
              Cancel
            </Button>
          </div>
        </AddEmployeeForm>
      )}
    </Formik>
  );
}
