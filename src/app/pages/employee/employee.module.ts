import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-rounting.module';
import { StartComponent } from './start/start.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxSpinnerModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
