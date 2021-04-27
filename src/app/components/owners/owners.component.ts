import {Component, OnDestroy, OnInit} from '@angular/core';
import {OwnerEntity} from '../../shared/models/interfaces';
import {CarOwnersService} from '../../services/car-owners.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit, OnDestroy {
  activeRow: boolean = false;
  addOnly: boolean = false;
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'cars'];
  editOnly: boolean = false;
  owners: OwnerEntity[] = [];
  ownerId: number;
  subscriptions: Subscription = new Subscription();
  viewOnly: boolean = false;
  private readonly storage: Storage;

  constructor(private carOwnersService: CarOwnersService) {
    this.storage = window.sessionStorage;
  }

  ngOnInit(): void {
    const getOwners = this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
    });
    this.carOwnersService.getAddOwner(this.addOnly);
    this.carOwnersService.getEditOwner(this.editOnly);
    this.carOwnersService.getViewOwner(this.viewOnly);

    this.subscriptions.add(getOwners);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    const deleteOwner = this.carOwnersService.deleteOwner(ownerNumber).subscribe();

    const getOwnersAfterDeletion = this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
    });

    this.subscriptions.add(deleteOwner).add(getOwnersAfterDeletion);
  }
}
