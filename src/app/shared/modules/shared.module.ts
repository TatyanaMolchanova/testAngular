import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class SharedModule { }
