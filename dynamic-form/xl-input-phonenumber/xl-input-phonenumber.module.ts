import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { XLInputPhoneNumberComponent } from './xl-input-phonenumber.component';
import { SharedModule } from '../../util/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [XLInputPhoneNumberComponent],
	exports: [XLInputPhoneNumberComponent],
	entryComponents: [XLInputPhoneNumberComponent]
})
export class XLInputPhoneNumberModule { }
