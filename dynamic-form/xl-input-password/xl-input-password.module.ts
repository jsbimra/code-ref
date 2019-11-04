import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { XLInputPasswordComponent } from './xl-input-password.component';
import { SharedModule } from '../../util/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [XLInputPasswordComponent],
	exports: [XLInputPasswordComponent],
	entryComponents: [XLInputPasswordComponent]
})
export class XLInputPasswordModule { }
