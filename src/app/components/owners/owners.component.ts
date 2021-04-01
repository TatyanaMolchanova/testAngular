import {Component, OnDestroy, OnInit} from '@angular/core';
import { OwnerEntity } from '../../shared/models/interfaces';
import { CarOwnersService } from '../../services/car-owners.service';
import { Subscription } from "rxjs";

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
  viewOnly: boolean = false;

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
    });
    this.carOwnersService.getViewOwner(this.viewOnly);
  }

  chooseRow(row) {
    this.ownerId = row.id;
    console.log(' this.ownerId',  this.ownerId);
  }

  addOwner() {

  }

  viewOwner() {
    this.viewOnly = true;
    // this.editOnly = false;
    this.carOwnersService.getViewOwner(this.viewOnly);
  }

  editOwner() {
    // this.editOnly = true;
    // this.viewOnly = false;
  }

  deleteOwner() {

  }

  ngOnDestroy() {
  }

}
