import React, { useState } from 'react';
import styled from 'styled-components';
import { IEmployee } from '../index';

const Employee = styled.div`
  background-color: #f5f5f5;
  padding: 5px;
  margin-bottom: 5px;
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

  &:hover {
    box-shadow: 0 2px 2px #ccc;
  }
`;

export default function ({ employee }: { employee: IEmployee }) {
  return (
    <Employee>
      <h4 className="title">
        {employee.name} {employee.lastName}{' '}
        {employee.birth && <small>27 años</small>}
      </h4>
      <small>desde {employee.workerFrom}</small>
      <small>
        <strong>{employee.monthlyHours}</strong> Hrs/Mes
      </small>
      <p className="salary">
        <strong>${employee.salary}</strong>
      </p>
    </Employee>
  );
}
