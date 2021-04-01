import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarOwnersService } from "../../services/car-owners.service";
import { DataService } from "../../services/data.service";
import { OwnerEntity } from "../../shared/models/interfaces";


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, AfterContentChecked {
  id: number;
  private subscription: Subscription;
  ownerForm: FormGroup;
  idOwner: number = 0;
  owner: OwnerEntity;
  owners: OwnerEntity[] = [];
  viewOwnerIsLoadedTimes: number = 0;
  // viewOnly: boolean = false;
  viewOnly: boolean;
  subscriptionView: Subscription;

  constructor(private fb: FormBuilder,
              private carOwnersService: CarOwnersService,
              // private data: DataService,
              private route: ActivatedRoute) {

    // this.carOwnersService.viewOwner$.subscribe((data) => {
    //   this.viewOnly = data;
    //
    //   console.log('THIS.VIEWONLY', this.viewOnly)
    //   console.log('THIS.VIEWONLY data', data)
    // })
  }


  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      // console.log('this.id', this.id);
    });
    // console.log('this.subscription', this.subscription);

    // this.carOwnersService.viewOwner$.subscribe((data) => {
    //   this.viewOnly = data;
    //
    //   console.log('THIS.VIEWONLY', this.viewOnly)
    //   console.log('THIS.VIEWONLY data', data)
    // })

    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      console.log('0 data', data);
      this.owners = data;
      this.idOwner = data.length + 1;
    });

    this.ownerForm = this.fb.group({
      id: 0,
      lastName: [''],
      firstName: [''],
      middleName: [''],
      cars: this.fb.array([this.fb.group({
        brand: [''],
        dateProduction: [''],
        modelName: [''],
        stateNumber: [''],
      })]),
    });

    // this.carOwnersService.viewOwner$.subscribe(view => this.viewOnly = view);
    // this.carOwnersService.viewOwner$.subscribe(view => {
    //   this.viewOnly = view
    //   console.log('this.carOwnersService.viewOwner$.subscribe VIEW', view)
    // });


    // this.subscriptionView = this.carOwnersService.viewOwner$.subscribe(view => {
    //   this.viewOnly = view
    //   console.log('subscriptionView view', view);
    //   console.log('subscriptionView this.viewOnly', this.viewOnly);
    // });

    // this.carOwnersService.getViewOwner(this.viewOnly);
    //
    // console.log('owner this.viewOnly', this.viewOnly);


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

        console.log('THIS.VIEWONLY', this.viewOnly)
        console.log('THIS.VIEWONLY data', data)
      })

      // this.carOwnersService.viewOwner$.subscribe(view => this.viewOnly = view);

    } else {
      this.ownerForm.patchValue({
        id: this.idOwner,
      })
    }

    // this.carOwnersService.getViewOwner(this.viewOnly);

    // console.log('aftercontenc this.viewOnly', this.viewOnly);
    // this.carOwnersService.viewOwner$.subscribe(view => this.viewOnly = view);
  }

  addCar() {
    this.cars.push(this.fb.group({
      brand: [''],
      dateProduction: [''],
      modelName: [''],
      stateNumber: [''],
    }));

    // this.carOwnersService.getViewOwner(this.viewOnly);

    // console.log('addcar this.viewOnly', this.viewOnly);
  }

  deleteCar(index) {
    if (this.cars.length === 1) {
      return;
    }
    this.cars.removeAt(index);
  }

  saveOwner() {
    this.ownerForm.patchValue({
      id: this.idOwner,
    })

    this.carOwnersService.createOwner(
      this.ownerForm.value.id,
      this.ownerForm.value.cars,
      this.ownerForm.value.firstName,
      this.ownerForm.value.lastName,
      this.ownerForm.value.middleName
    ).subscribe((data: OwnerEntity) => {
      this.owner = data;
    });

    this.cars.value.pop();
  }

  viewOwner() {
    // this.carOwnersService.getViewOwner(this.viewOnly);
  }

}
