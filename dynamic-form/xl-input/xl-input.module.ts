import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { XLInputComponent } from './xl-input.component';
import { SharedModule } from '../../util/shared.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	declarations: [XLInputComponent],
	exports: [XLInputComponent],
	entryComponents: [XLInputComponent]
})
export class XLInputModule { }
