import { Component, OnInit } from '@angular/core';

import { OwnerEntity } from "../shared/interfaces";
import { CarOwnersService } from "../shared/services/car-owners.service";

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  owners: OwnerEntity[] = [];
  // displayedColumns: string[] = ['Фамилия', 'Имя', 'Отчество', 'Количество автомобилей'];
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  // columnsToDisplay: string[] = ['lastName', 'firstName', 'middleName', 'cars'];

  // displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  // columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      console.log('data', data);
      this.owners = data;
      // this.dataSource = data;
    });
  }

  addOwner() {

  }

  viewOwner() {

  }

  editOwner() {

  }

  deleteOwner() {

  }
}
