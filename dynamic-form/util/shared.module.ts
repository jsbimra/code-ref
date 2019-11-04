import { NgModule } from '@angular/core';
import { HighlightFormControlDirective } from './highlight-form-control.directive';
import { OnlyNumberDirecrtive } from './only-number.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { XLInputModule } from '../components/xl-input/xl-input.module';
import { XLFormService } from './xlForm.service';

@NgModule({
    declarations: [
        HighlightFormControlDirective,
        OnlyNumberDirecrtive,
    ],
    imports: [ 
        ReactiveFormsModule, 
        CommonModule,
     ],
    exports: [
        HighlightFormControlDirective, 
        OnlyNumberDirecrtive,
    ],
    providers: [ XLFormService ]
})
export class SharedModule { }
