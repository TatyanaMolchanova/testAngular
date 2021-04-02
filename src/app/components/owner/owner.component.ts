import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CarOwnersService } from "../../services/car-owners.service";
import { DataService } from "../../services/data.service";
import { OwnerEntity } from "../../shared/models/interfaces";


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, AfterContentChecked, OnDestroy {
  id: number;
  private subscription: Subscription;
  ownerForm: FormGroup;
  idOwner: number = 0;
  owner: OwnerEntity;
  owners: OwnerEntity[] = [];
  viewOwnerIsLoadedTimes: number = 0;
  addOnly: boolean = false;
  editOnly: boolean = false;
  viewOnly: boolean = false;

  constructor(private fb: FormBuilder,
              private carOwnersService: CarOwnersService,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      // console.log('this.id', this.id);
    });

    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      console.log('0 data', data);
      this.owners = data;
      this.idOwner = data.length + 1;
    });

    this.ownerForm = this.fb.group({
      id: 0,
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: ['', [Validators.required, Validators.minLength(3)]],
      cars: this.fb.array([this.fb.group({
        brand: ['', [Validators.required, Validators.minLength(2)]],
        dateProduction: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        modelName: ['', [Validators.required, Validators.minLength(2)]],
        stateNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      })]),
    });

    this.carOwnersService.addOwner$.subscribe(data => {
      this.addOnly = data;
      // console.log('THIS.VIEWONLY', this.addOnly)
      // console.log('THIS.VIEWONLY data', data)
    });

    this.carOwnersService.editOwner$.subscribe(data => this.editOnly = data);
  }

  get cars() {
    return this.ownerForm.get('cars') as FormArray;
  }

  // get ownerDataFromForm(): FormGroup {
  //   return this.ownerForm.get('lastName') as FormGroup;
  // }

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
        // this.cars.setValue([
        //   {
        //     brand: currentOwner?.cars.map(car => car.brand) || null,
        //     dateProduction: currentOwner?.cars.map(car => car.dateProduction) || null,
        //     modelName: currentOwner?.cars.map(car => car.modelName) || null,
        //     stateNumber: currentOwner?.cars.map(car => car.stateNumber) || null,
        //   }
        // ]);
        for (let i = 0;  i < carsQuantity; i++) {
          // console.log('cars.push');
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

      this.carOwnersService.viewOwner$.subscribe((data) => {
        this.viewOnly = data;
        // console.log('THIS.VIEWONLY', this.viewOnly)
        // console.log('THIS.VIEWONLY data', data)
      });

      if (this.viewOnly) {
        this.ownerForm.controls['lastName'].disable();
        this.ownerForm.controls['firstName'].disable();
        this.ownerForm.controls['middleName'].disable();
        this.ownerForm.controls['cars'].disable();
      }

    } else {
      this.ownerForm.patchValue({
        id: this.idOwner,
      })

      console.log('this.cars', this.cars)
    }

    console.log('this.ownerForm', this.ownerForm);
    console.log('this.ownerForm.value', this.ownerForm.value);
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
    // this.ownerForm.patchValue({
    //   id: this.idOwner,
    // })

    console.log('this.addOnly saveOwner', this.addOnly)

    if (this.addOnly) {
      console.log('saveOwner ADD')
      this.carOwnersService.createOwner(
        this.ownerForm.value.id,
        this.ownerForm.value.cars,
        this.ownerForm.value.firstName,
        this.ownerForm.value.lastName,
        this.ownerForm.value.middleName
      ).subscribe((data: OwnerEntity) => {
        this.owner = data;
      });

      // this.cars.value.pop();
      // return;
    }

    if (this.editOnly) {
      console.log('saveOwner EDIT')
      this.carOwnersService.editOwner(this.ownerForm.value).subscribe((data: OwnerEntity) => {
        this.owner = data;
      });
    }
  }

  ngOnDestroy() {

  }

}
