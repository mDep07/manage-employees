import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IEmployee } from '../index';
import Button from './Button';

const Employee = styled.div`
  background-color: #f5f5f5;
  padding: 5px;
  margin-bottom: 10px;
  box-shadow: 0 3px 0 #c7c7c7;

  & *:not(button) {
    margin: 0;
  }
  & small {
    display: block;
  }
  & .title {
    font-size: 1.2rem;
    margin: 5px 0;
  }
  & .salary {
    font-size: 1.6rem;
    margin: 5px 0;
  }
`;

interface Params {
  employee: IEmployee;
  remove: Function;
  edit: Function;
}
export default function ({ employee, remove, edit }: Params) {
  const age = employee.birth
    ? moment().diff(moment(employee.birth), 'years')
    : '';

  const convertCurrency = (number: number) => {
    const numberFormat = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
    return numberFormat.format(number);
  };
  return (
    <Employee>
      <h4 className="title">
        {employee.name} {employee.lastName} {age && <small>({age} años)</small>}
      </h4>
      <small>
        Worker from <em>{moment(employee.workerFrom).from(moment())}</em>
      </small>
      <small>
        <strong>{employee.monthlyHours}</strong> Hrs/month
      </small>
      <small>
        <strong>
          {convertCurrency(employee.salary / employee.monthlyHours)}
        </strong>
      </small>
      <p className="salary">
        <strong>{convertCurrency(employee.salary)}</strong>
      </p>
      <Button color="#2d73e3" onClick={() => edit(employee.id)}>
        Edit
      </Button>
      <Button color="#e32d2d" onClick={() => remove(employee.id)}>
        Delete
      </Button>
    </Employee>
  );
}
