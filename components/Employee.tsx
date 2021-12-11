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
`;

export default function ({ employee }: { employee: IEmployee }) {
  const theme = {
    palete: {
      primary: '#171282',
      secondary: '#4f1282',
    },
  };
  return (
    <Employee theme={theme}>
      <h4 className="title">
        {employee.name} {employee.lastName} {employee.birth && '27 años'}
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
