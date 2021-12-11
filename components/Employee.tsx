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
`;

export default function ({ employee }) {
  const theme = {
    palete: {
      primary: '#171282',
      secondary: '#4f1282',
    },
  };
  return (
    <Employee theme={theme}>
      <h4>
        {employee.name} {employee.lastName} {employee.birth && '27 años'}
      </h4>
      <p>{employee.workerFrom}</p>
      <p>{employee.salary}</p>
      <p>{employee.monthlyHours}</p>
    </Employee>
  );
}
