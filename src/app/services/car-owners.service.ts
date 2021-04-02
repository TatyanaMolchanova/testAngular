import { Injectable } from '@angular/core';
import { CarEntity, ICarOwnersService, OwnerEntity } from "../shared/models/interfaces";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "./data.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements  ICarOwnersService {
  SERVER_URL: string = 'http://localhost:8080/api';
  options: {} = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  private addOwnerSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  addOwner$: Observable<boolean> = this.addOwnerSource.asObservable();
  private editOwnerSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  editOwner$: Observable<boolean> = this.editOwnerSource.asObservable();
  private viewOwnerSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  viewOwner$: Observable<boolean> = this.viewOwnerSource.asObservable();

  constructor(private http: HttpClient) {

  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.SERVER_URL + '/owners');
  };

  getOwnerById(id: number): Observable<OwnerEntity> {
    return;
  };

  getAddOwner(addOnly: boolean) {
    this.addOwnerSource.next(addOnly);
  }

  getEditOwner(editOnly: boolean) {
    this.editOwnerSource.next(editOnly);
  }

  getViewOwner(viewOnly: boolean) {
    this.viewOwnerSource.next(viewOnly);
  }

  createOwner(
    id: number,
    cars: CarEntity[],
    firstName: string,
    lastName: string,
    middleName: string
  ): Observable<OwnerEntity> {
    const owner = { id, cars, firstName, lastName, middleName };
    return this.http.post<OwnerEntity>(`${this.SERVER_URL + '/owners'}`, owner, this.options).pipe(
      catchError(this.handleError)
    )
  };

  editOwner(owner): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(`${this.SERVER_URL + '/owners'}`, owner, this.options).pipe(
      catchError(this.handleError)
    )
  };

  deleteOwner(ownerId: number) {
    return this.http.delete<OwnerEntity>(`${this.SERVER_URL + '/owners/' + ownerId}`, this.options).pipe(
      catchError(this.handleError)
    )
  };

  handleError(error: any) {
    return throwError(error);
  }
}
