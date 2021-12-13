import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IEmployee } from '../index';

const Employee = styled.div`
  background-color: #f5f5f5;
  padding: 5px;
  margin-bottom: 10px;
  box-shadow: 0 3px 0 #c7c7c7;

  & * {
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

const Button = styled.button`
  font-size: .75rem;
  padding: 4px;
  background-color: ${({ color }) => color};
  border: none;
  color: #fff;
  cursor: pointer;
  min-width: 20%;
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

export default function ({ employee }: { employee: IEmployee }) {
  const age = employee.birth
    ? moment().diff(moment(employee.birth), 'years')
    : '';
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
      <p className="salary">
        <strong>${employee.salary}</strong>
      </p>
      <Button color="#2d73e3">Edit</Button>
      <Button color="#e32d2d">Delete</Button>
    </Employee>
  );
}
