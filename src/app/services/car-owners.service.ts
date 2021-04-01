import { Injectable } from '@angular/core';
import { CarEntity, ICarOwnersService, OwnerEntity } from "../shared/models/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "./data.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements  ICarOwnersService {
  SERVER_URL: string = 'http://localhost:8080/api/';
  options: {} = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  private viewOwnerSource = new Subject<boolean>();
  // viewOwner$ = this.viewOwnerSource.asObservable();
  viewOwner$: Observable<boolean>;

  constructor(private http: HttpClient,
              private data: DataService) {
    this.viewOwner$ = this.viewOwnerSource.asObservable();
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.SERVER_URL + 'owners');
  };

  getOwnerById(id: number): Observable<OwnerEntity> {
    return;
  };

  getViewOwner(viewOnly: boolean) {
    this.viewOwnerSource.next(viewOnly);

    console.log('this.viewOwnerSource.next(viewOnly)', this.viewOwnerSource.next(viewOnly));
    // this.viewOwnerSource.next(editOnly);
  }

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
