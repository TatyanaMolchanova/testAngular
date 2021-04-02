import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class SharedModule { }
