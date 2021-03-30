import { Injectable } from '@angular/core';
import { CarEntity, ICarOwnersService, OwnerEntity } from "../interfaces";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements  ICarOwnersService {
  SERVER_URL: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient,
              private data: DataService) { }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.SERVER_URL + 'owners');
  };

  getOwnerById(id: number): Observable<OwnerEntity> {
    return;
  };

  createOwner(
    id: number,
    cars: CarEntity[],
    firstName: string,
    lastName: string,
    middleName: string
  ): Observable<OwnerEntity> {
    return;
  };

  editOwner(owner: OwnerEntity): Observable<OwnerEntity> {
    return;
  };

  deleteOwner(owner: number): void {

  };
}
