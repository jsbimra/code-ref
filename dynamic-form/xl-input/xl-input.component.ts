import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../util/interface/field.config';

@Component({
  selector: 'xl-input',
  template: `
    <div class="form-group" [formGroup]="xlFormGroup">
      <label>{{ label }} <span *ngIf="required" class="uppercase">*</span></label>

      <div class="xl__input-group">
          <input class="xl__input" 
              autocomplete="off" 
              type="text"
              [formControlName]="xlField.name"
              [name]="xlField.name"
              [id]="xlField.name"
              [placeholder]="placeholder"
              [value]="value"
              [minlength]="minlength"
              [maxlength]="maxlength"
              [required]="required !== '' && required !== undefined  ? true : false"
              xlHighlightFormControl 
            />
      
        <ng-container *ngFor="let validation of xlField.validations;">
          <div class="xl__input-error" *ngIf="xlFormGroup.get(xlField.name).hasError(validation.name) && xlFormGroup.get(xlField.name).invalid && (xlFormGroup.get(xlField.name).dirty || xlFormGroup.get(xlField.name).touched)">
              <p>{{validation.message }}</p>
          </div>
        </ng-container>

        </div>    
    </div>
  `,
  styleUrls: ['./xl-input.component.scss']
})
export class XLInputComponent implements OnInit {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() required?: any;
  @Input() maxlength?: string;
  @Input() minlength?: string;

  @Input() xlField?: FieldConfig;
  @Input() xlFormGroup?: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const validList = [];
    
    // console.log('Input Field value: ', this.value);

    if (this.xlFormGroup && this.xlField.name) {
      if (this.xlFormGroup && this.xlField.name) {
        this.xlFormGroup.controls[this.xlField.name].setValidators(validList);
        // this.xlFormGroup.controls[this.xlField.name].updateValueAndValidity();
      }
    }

  }

}
