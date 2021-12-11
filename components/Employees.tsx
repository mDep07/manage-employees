import React, { useState } from 'react';
import styled from 'styled-components';

import { IEmployee } from '../index';
import Employee from './Employee';

const Employees = styled.section`
  background-color: red;
`;

export default function ({ employees }: { employees: IEmployee[] }) {
  const theme = {
    palete: {
      primary: '#171282',
      secondary: '#4f1282',
    },
  };
  return (
    <Employees>
      {employees.map((e) => (
        <Employee key={e.id} employee={e} />
      ))}
    </Employees>
  );
}
