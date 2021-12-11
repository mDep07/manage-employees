import { Low, JSONFile } from 'lowdb';
import { IEmployee } from './index';

type Data = {
  employees: IEmployee[];
};
const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter);

const getEmployees = (): IEmployee[] => {
  const { employees } = db.data;
  return employees;
};
const getEmployee = (employeeId: number): IEmployee | undefined => {
  const { employees } = db.data;
  return employees.find((e) => e.id === employeeId);
};
const createEmployee = (employee: IEmployee) => {};

export { getEmployees, getEmployee, createEmployee };
