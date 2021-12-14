import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Formik, Field, Form, FormikHelpers, FormikErrors } from 'formik';

import { IEmployee } from '../index';

const TitleForm = styled.h4`
  background-color: var(--color);
  min-width: 50%;
  margin: 0;
  padding: 5px;
  color: white;
  font-weight: 700;
  text-align: center;
`;

const StyledForm = styled(Form)`
  padding: 5px;
  background-color: var(--color);
  margin-bottom: 5px;
`;

const StyledFormControl = styled.div`
  margin-bottom: 5px;
`;

const StyledField = styled(Field)`
  font-size: 1rem;
  padding: 10px 5px;
  display: block;
  width: 100%;
  background-color: white;
  border: none;
  color: black;
  ${({ error }) => (error ? 'border-bottom: 2px solid red;' : '')}
`;

const StyledLabel = styled.label`
  font-size: .8em;
  color: white;
  padding: 2px 6px;
  font-weight: 700;
`;

const StyledFieldError = styled.div`
  display: inline-block;
  font-size: .8em;
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
    <React.Fragment>
      <TitleForm>{employee.id === 0 ? 'Create' : 'Edit'}</TitleForm>
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
        {({ values, touched, errors, isSubmitting }) => (
          <StyledForm>
            <input id="id" name="id" type="hidden" value={values.id} />
            <StyledFormControl>
              <StyledLabel for="lastName">Name</StyledLabel>
              <StyledField
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                error={errors.name && touched.name}
                value={values.name}
              />
              {errors.name && touched.name && (
                <StyledFieldError>{errors.name}</StyledFieldError>
              )}
            </StyledFormControl>
            <StyledFormControl>
              <StyledLabel for="lastName">Last Name</StyledLabel>
              <StyledField
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                error={errors.name && touched.name}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName && (
                <StyledFieldError>{errors.lastName}</StyledFieldError>
              )}
            </StyledFormControl>

            <StyledFormControl>
              <StyledLabel for="lastName">Birth</StyledLabel>
              <StyledField
                id="birth"
                name="birth"
                type="date"
                placeholder={new Date().toString()}
                value={values.birth}
              />
            </StyledFormControl>

            <StyledFormControl>
              <StyledLabel for="lastName">Worker From</StyledLabel>
              <StyledField
                id="workerFrom"
                name="workerFrom"
                type="date"
                placeholder={new Date().toString()}
                value={values.workerFrom}
              />
            </StyledFormControl>

            <StyledFormControl>
              <StyledLabel for="lastName">Salary</StyledLabel>
              <StyledField
                id="salary"
                name="salary"
                type="number"
                placeholder="0"
                error={errors.name && touched.name}
                value={values.salary}
              />
              {errors.salary && touched.salary && (
                <StyledFieldError>{errors.salary}</StyledFieldError>
              )}
            </StyledFormControl>

            <StyledFormControl>
              <StyledLabel for="lastName">Monthly Hours</StyledLabel>
              <StyledField
                id="monthlyHours"
                name="monthlyHours"
                type="number"
                placeholder="0"
                error={errors.name && touched.name}
                value={values.monthlyHours}
              />
              {errors.monthlyHours && touched.monthlyHours && (
                <StyledFieldError>{errors.monthlyHours}</StyledFieldError>
              )}
            </StyledFormControl>

            <div style={{ textAlign: 'center' }}>
              <Button color="#009e49" type="submit">
                Save
              </Button>
              <Button color="#c2c2c2" type="reset">
                Cancel
              </Button>
            </div>
          </StyledForm>
        )}
      </Formik>
    </React.Fragment>
  );
}
