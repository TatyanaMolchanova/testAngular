import {Component, OnDestroy, OnInit} from '@angular/core';
import { OwnerEntity } from '../../shared/models/interfaces';
import { CarOwnersService } from '../../services/car-owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit, OnDestroy {

  owners: OwnerEntity[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  activeRow: boolean = false;
  ownerId: number;
  addOnly: boolean = false;
  editOnly: boolean = false;
  viewOnly: boolean = false;

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
      console.log('data owners', data)
    });
    this.carOwnersService.getAddOwner(this.addOnly);
    this.carOwnersService.getEditOwner(this.editOnly);
    this.carOwnersService.getViewOwner(this.viewOnly);
  }

  chooseRow(row) {
    this.ownerId = row.id;
    // console.log(' this.ownerId',  this.ownerId);
  }

  addOwner() {
    this.addOnly = true;
    this.carOwnersService.getAddOwner(this.addOnly);
  }

  viewOwner() {
    this.viewOnly = true;
    this.carOwnersService.getViewOwner(this.viewOnly);
  }

  editOwner() {
    this.editOnly = true;
    this.carOwnersService.getEditOwner(this.editOnly);
  }

  deleteOwner(ownerNumber) {
    this.carOwnersService.deleteOwner(ownerNumber).subscribe(data => {
      console.log('data from deleteOwner', data);
    })
  }

  ngOnDestroy() {
  }

}
