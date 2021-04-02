import { Component, OnInit } from '@angular/core';
import { OwnerEntity } from '../../shared/models/interfaces';
import { CarOwnersService } from '../../services/car-owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  activeRow: boolean = false;
  addOnly: boolean = false;
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  editOnly: boolean = false;
  owners: OwnerEntity[] = [];
  ownerId: number;
  viewOnly: boolean = false;
  private readonly storage: Storage;

  constructor(private carOwnersService: CarOwnersService) {
    this.storage = window.sessionStorage;
  }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
    });
    this.carOwnersService.getAddOwner(this.addOnly);
    this.carOwnersService.getEditOwner(this.editOnly);
    this.carOwnersService.getViewOwner(this.viewOnly);
  }

  chooseRow(row) {
    this.ownerId = row.id;
  }

  addOwner() {
    this.addOnly = true;
    this.carOwnersService.getAddOwner(this.addOnly);
  }

  viewOwner() {
    this.viewOnly = true;
    this.editOnly = false;
    this.carOwnersService.getViewOwner(this.viewOnly);
    this.storage.setItem('isViewOnly', `${this.viewOnly}`);
    this.storage.setItem('isEditOnly', `${this.editOnly}`);
  }

  editOwner() {
    this.editOnly = true;
    this.viewOnly = false;
    this.carOwnersService.getEditOwner(this.editOnly);
    this.storage.setItem('isViewOnly', `${this.viewOnly}`);
    this.storage.setItem('isEditOnly', `${this.editOnly}`);
  }

  deleteOwner(ownerNumber) {
    this.carOwnersService.deleteOwner(ownerNumber).subscribe();

    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
    });
  }
}
