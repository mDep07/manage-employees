import { LowSync, LocalStorage, Low, JSONFile } from 'lowdb';
import { IEmployee } from './index';

type Data = { employees: IEmployee[] };
const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter);
db.read();
const defaultValues: Data = { employees: [] };
db.data = db.data || defaultValues;

console.log(db.data);

export default function () {
  const getEmployees = (): IEmployee[] | null => {
    const { employees } = db.data;
    return employees;
  };

  const getEmployee = (employeeId: number): IEmployee | undefined => {
    const { employees } = db.data;
    return employees.find((e) => e.id === employeeId);
  };

  const createEmployee = (employee: IEmployee): IEmployee => {
    const { employees } = db.data;
    const employeeId =
      employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    employees.push({ ...employee, id: employeeId });
    db.write();
    return { ...employee, id: employeeId };
  };

  const modifyEmployee = (employee: IEmployee): IEmployee => {
    let { employees } = db.data;
    const employeeIndex = employees.findIndex((e) => e.id === employee.id);
    employees = [
      ...employees.slice(0, employeeIndex),
      { ...employee },
      ...employees.slice(employeeIndex + 1),
    ];
    db.write();
    return employee;
  };

  const removeEmployee = (employeeId: number): boolean => {
    let { employees } = db.data;
    const employeeIndex = employees.findIndex((e) => e.id === employeeId);
    employees = [
      ...employees.slice(0, employeeIndex),
      ...employees.slice(employeeIndex + 1),
    ];

    console.log({ employees });
    db.write();
    return true;
  };

  return {
    getEmployees,
    getEmployee,
    createEmployee,
    modifyEmployee,
    removeEmployee,
  };
}
