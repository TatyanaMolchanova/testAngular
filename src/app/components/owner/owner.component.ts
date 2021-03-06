import {
  AfterContentChecked,
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarOwnersService } from "../../services/car-owners.service";
import { OwnerEntity } from "../../shared/models/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { DialogOnSaveAddComponent } from "../dialogs/dialog-on-save-add/dialog-on-save-add.component";
import { DialogOnSaveEditComponent } from "../dialogs/dialog-on-save-edit/dialog-on-save-edit.component";


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, AfterContentChecked, OnDestroy {
  addOnly: boolean = false;
  addOwnerSub: Subscription;
  currentYear: number = (new Date()).getFullYear();
  editOnly: boolean = false;
  editOwner: Subscription;
  viewOnly: boolean = false;
  id: number;
  idOwner: number = 0;
  owner: OwnerEntity;
  ownerForm: FormGroup;
  owners: OwnerEntity[] = [];
  ownersSub: Subscription;
  subscriptions: Subscription = new Subscription();
  viewOwnerIsLoadedTimes: number = 0;
  private readonly storage: Storage;
  private subscription: Subscription;

  constructor(public dialog: MatDialog,
              private fb: FormBuilder,
              private carOwnersService: CarOwnersService,
              private route: ActivatedRoute) {
    this.storage = window.sessionStorage;
  }


  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    const ownersSub = this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      this.owners = data;
      this.idOwner = data.length;
    });

    this.ownerForm = this.fb.group({
      id: 0,
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: ['', [Validators.required, Validators.minLength(3)]],
      cars: this.fb.array([this.fb.group({
        brand: ['', [Validators.required, Validators.minLength(2)]],
        dateProduction: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.min(1990),
          Validators.max((new Date()).getFullYear())
        ]],
        modelName: ['', [Validators.required, Validators.minLength(2)]],
        stateNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      })]),
    });

    const addOwnerSub = this.carOwnersService.addOwner$.subscribe(data => {
      this.addOnly = data;
    });

    const editOwner = this.carOwnersService.editOwner$.subscribe(data => this.editOnly = data);

    this.subscriptions.add(ownersSub).add(addOwnerSub).add(editOwner);
  }

  get cars() {
    return this.ownerForm.get('cars') as FormArray;
  }

  ngAfterContentChecked() {
    if (this.id || this.id === 0) {
      if (this.viewOwnerIsLoadedTimes < 2) {

        const currentOwner = this.owners[this.id];
        const carsQuantity = this.owners[this.id]?.cars.length;

        this.ownerForm.patchValue({
          id: this.id,
          lastName: currentOwner?.lastName,
          firstName: currentOwner?.firstName,
          middleName: currentOwner?.middleName,
        });
        for (let i = 0;  i < carsQuantity; i++) {
          this.cars.push(this.fb.group({
            brand: currentOwner?.cars.filter((car, index) => index === i).map(car => car.brand),
            dateProduction: currentOwner?.cars.filter((car, index) => index === i).map(car => car.dateProduction),
            modelName: currentOwner?.cars.filter((car, index) => index === i).map(car => car.modelName),
            stateNumber: currentOwner?.cars.filter((car, index) => index === i).map(car => car.stateNumber),
          }));
        }

        this.deleteCar(0);
        this.viewOwnerIsLoadedTimes++;
      }

      const viewOwner = this.carOwnersService.viewOwner$.subscribe((data) => {
        this.viewOnly = data;
      });

      // if (this.viewOnly) {
      if (this.storage.getItem('isViewOnly') === 'true') {
        this.ownerForm.controls['lastName'].disable();
        this.ownerForm.controls['firstName'].disable();
        this.ownerForm.controls['middleName'].disable();
        this.ownerForm.controls['cars'].disable();
      }
      this.subscriptions.add(viewOwner);
    } else {
      this.ownerForm.patchValue({
        id: this.idOwner,
      })
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addCar() {
    this.cars.push(this.fb.group({
      brand: [''],
      dateProduction: [''],
      modelName: [''],
      stateNumber: [''],
    }));
  }

  deleteCar(index) {
    if (this.cars.length === 1) {
      return;
    }
    this.cars.removeAt(index);
  }

  saveOwner() {
    if (this.addOnly) {
      this.carOwnersService.createOwner(
        this.ownerForm.value.id,
        this.ownerForm.value.cars,
        this.ownerForm.value.firstName,
        this.ownerForm.value.lastName,
        this.ownerForm.value.middleName
      ).subscribe((data: OwnerEntity) => {
        this.owner = data;
      });

      this.dialog.open(DialogOnSaveAddComponent);
    }

    if (this.storage.getItem('isEditOnly') === 'true') {
      const editOwnerOnSave = this.carOwnersService.editOwner(this.ownerForm.value).subscribe((data: OwnerEntity) => {
        this.owner = data;
      });

      this.dialog.open(DialogOnSaveEditComponent);
      this.subscriptions.add(editOwnerOnSave);
    }
  }
}
