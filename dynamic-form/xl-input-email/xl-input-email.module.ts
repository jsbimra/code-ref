import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { XLInputEmailComponent } from './xl-input-email.component';
import { SharedModule } from '../../util/shared.module';

@NgModule({
	declarations: [XLInputEmailComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [XLInputEmailComponent],
	entryComponents: [XLInputEmailComponent]
})
export class XLInputEmailModule { }
