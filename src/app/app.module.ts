import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnersComponent } from './components/owners/owners.component';
import { CarsComponent } from './components/cars/cars.component';
import { DataService } from "./services/data.service";
import { SharedModule } from "./shared/modules/shared.module";
import { OwnerComponent } from './components/owner/owner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogOnSaveAddComponent } from './components/dialogs/dialog-on-save-add/dialog-on-save-add.component';
import { DialogOnSaveEditComponent } from './components/dialogs/dialog-on-save-edit/dialog-on-save-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    OwnersComponent,
    OwnerComponent,
    DialogOnSaveAddComponent,
    DialogOnSaveEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
