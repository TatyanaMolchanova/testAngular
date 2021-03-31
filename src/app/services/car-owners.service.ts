import { Injectable } from '@angular/core';
import { CarEntity, ICarOwnersService, OwnerEntity } from "../shared/models/interfaces";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { DataService } from "./data.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements  ICarOwnersService {
  SERVER_URL: string = 'http://localhost:8080/api/';
  options: {} = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

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
    const owner = { id, cars, firstName, lastName, middleName };

    console.log(' this.http.post<OwnerEntity>(`${this.SERVER_URL + \'owners\'}`, owner, this.options)',  this.http.post<OwnerEntity>(`${this.SERVER_URL + 'owners'}`, owner, this.options));

    return this.http.post<OwnerEntity>(`${this.SERVER_URL + 'owners'}`, owner, this.options).pipe(
      catchError(this.handleError)
    )
  };

  editOwner(owner: OwnerEntity): Observable<OwnerEntity> {
    return;
  };

  deleteOwner(owner: number): void {

  };

  handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
