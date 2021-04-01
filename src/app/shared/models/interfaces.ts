import { Observable } from "rxjs";

export interface OwnerEntity {
  id: number;
  cars: CarEntity[];
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface CarEntity {
  id: number;
  dateProduction: number;
  modelName: string;
  brand: string;
  stateNumber: number | string;
}

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(id: number): Observable<OwnerEntity>;
  createOwner(
    id: number,
    cars: CarEntity[],
    firstName: string,
    lastName: string,
    middleName: string
  ): Observable<OwnerEntity>;
  // editOwner(owner: OwnerEntity): Observable<OwnerEntity>;
  editOwner(
    id: number,
    cars: CarEntity[],
    firstName: string,
    lastName: string,
    middleName: string
  ): Observable<OwnerEntity>;
  deleteOwner(owner: number): void;
}
