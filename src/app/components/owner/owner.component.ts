import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';
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
export class OwnerComponent implements OnInit {
  id: number;
  private subscription: Subscription;
  ownerForm: FormGroup;
  idOwner: number = 0;
  owner: OwnerEntity;

  constructor(private fb: FormBuilder,
              private carOwnersService: CarOwnersService,
              // private data: DataService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log('this.id', this.id);
    });
    console.log('this.subscription', this.subscription);





    this.carOwnersService.getOwners().subscribe((data: OwnerEntity[]) => {
      console.log('0 data', data);
      return this.idOwner = data.length + 1;
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
  }

  get cars() {
    return this.ownerForm.get('cars') as FormArray;
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

}
