import { LowSync, LocalStorage } from 'lowdb';
import { IEmployee } from './index';

type Data = {
  employees: IEmployee[];
};
const adapter = new LocalStorage<Data>('db.json');
const db = new LowSync<Data>(adapter);

export default function () {
  console.log({ db });

  const getEmployees = (): IEmployee[] => {
    return db.data.employees;
  };

  const getEmployee = (employeeId: number): IEmployee | undefined => {
    const { employees } = db.data;
    return employees.find((e) => e.id === employeeId);
  };

  const createEmployee = async (employee: IEmployee) => {
    try {
      db.data.employees.push(employee);
      await db.write();
      return true;
    } catch (err) {
      return false;
    }
  };

  return { getEmployees, getEmployee, createEmployee };
}
