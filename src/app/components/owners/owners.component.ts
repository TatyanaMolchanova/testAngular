import { Component, OnInit } from '@angular/core';
import { OwnerEntity } from '../../shared/models/interfaces';
import { CarOwnersService } from '../../services/car-owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  owners: OwnerEntity[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  // active: string = '';
  activeRow: boolean = false;

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      console.log('data', data);
      this.owners = data;
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
