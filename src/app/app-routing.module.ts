import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from "./components/owners/owners.component";
import { CarsComponent } from "./components/cars/cars.component";

const routes: Routes = [
  { path: '', redirectTo: 'owners', pathMatch: 'full' },
  { path: 'owners', component: OwnersComponent },
  { path: 'cars', component: CarsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
