import React, { useState, useEffect } from 'react';
import { IEmployee } from '../index';

import db from '../Db';

export default function (initialState: IEmployee[]) {
  const {
    getEmployees,
    getEmployee,
    createEmployee,
    modifyEmployee,
    removeEmployee,
  } = db();

  const [employees, setEmployees] = useState(initialState);
  useEffect(() => {
    const listEmployees = getEmployees();
    if (listEmployees) setEmployees([...listEmployees]);
  }, []);

  const addEmployee = (employee: IEmployee) => {
    const employeeCreated = createEmployee(employee);
    if (employeeCreated.id !== 0)
      setEmployees([...employees, { ...employeeCreated }]);
  };

  const editEmployee = (employee: IEmployee) => {
    const employeeEdited = modifyEmployee(employee);
    const employeeIndex = employees.findIndex(
      (e) => e.id === employeeEdited.id
    );
    setEmployees([
      ...employees.slice(0, employeeIndex),
      { ...employeeEdited },
      ...employees.slice(employeeIndex + 1),
    ]);
  };

  const deleteEmployee = (employeeId: number) => {
    const employeeDeleted = removeEmployee(employeeId);
    if (employeeDeleted) {
      const employeeIndex = employees.findIndex((e) => e.id === employeeId);
      setEmployees([
        ...employees.slice(0, employeeIndex),
        ...employees.slice(employeeIndex + 1),
      ]);
    }
  };

  return { employees, addEmployee, editEmployee, deleteEmployee };
}
