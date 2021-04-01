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
  public viewOnly: boolean = false;
  public editOnly: boolean = false;
  subscription: Subscription;

  constructor(private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      console.log('data OwnersComponent', data);
      this.owners = data;
    });

    // this.subscription = this.carOwnersService.viewOwner$.subscribe((view, edit) => {
    //   this.viewOnly = view;
    //   this.editOnly = edit;
    //   return;
    // })

    // console.log('0 this.viewOnly', this.viewOnly);
    this.subscription = this.carOwnersService.viewOwner$.subscribe(view => {
      this.viewOnly = view
      console.log('view', view);
      console.log('1 this.viewOnly', this.viewOnly);
    });
    // // this.subscription = this.carOwnersService.viewOwner$.subscribe(edit => this.editOnly = edit);
    console.log('1 this.viewOnly', this.viewOnly);
    // console.log('this.subscription', this.subscription)

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
    console.log('in OWNERS this.viewOnly', this.viewOnly)
    // this.editOnly = false;
    this.carOwnersService.getViewOwner(this.viewOnly);
    console.log('click viewOwn er')
  }

  editOwner() {
    // this.editOnly = true;
    // this.viewOnly = false;
  }

  deleteOwner() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
