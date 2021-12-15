import { LowSync, LocalStorage } from 'lowdb';
import { IEmployee } from './index';

type Data = { employees: IEmployee[] };
const adapter = new LocalStorage<Data>('db');
const db = new LowSync<Data>(adapter);
db.read();

export default function () {
  const getEmployees = (): IEmployee[] | null => {
    const { employees } = db.data;
    return employees;
  };

  const getEmployee = (employeeId: number): IEmployee | undefined => {
    const { employees } = db.data;
    return employees.find((e) => e.id === employeeId);
  };

  const createEmployee = (employee: IEmployee) => {
    const { employees } = db.data;
    employees.push(employee);
    db.write();
    return employee;
  };

  const removeEmployee = (employeeId: number) => {
    let { employees } = db.data;
    const employeeIndex = employees.findIndex((e) => e.id === employeeId);
    employees = [
      ...employees.slice(0, employeeIndex),
      ...employees.slice(employeeIndex + 1),
    ];
    db.write();
  };

  return { getEmployees, getEmployee, createEmployee, removeEmployee };
}
