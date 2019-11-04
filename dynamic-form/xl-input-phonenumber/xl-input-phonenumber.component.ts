import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../util/interface/field.config';

@Component({
  selector: 'xl-input-phonenumber',
  template: `
    <div class="form-group" [formGroup]="xlFormGroup">
      <label>{{ label }} <span *ngIf="required" class="uppercase">*</span></label>

      <div class="xl__input-group">
        <input class="xl__input" 
            autocomplete="off" 
            [name]="xlField.name"
            [formControlName]="xlField.name"
            type="text"
            [placeholder]="placeholder"
            [value]="value"
            [minlength]="minlength"
            [maxlength]="maxlength"
            [value]="value"
            [required]="required !== '' && required !== undefined  ? true : false"
            xlHighlightFormControl 
          />
          
          <ng-container *ngFor="let validation of xlField.validations;">
            <div class="xl__input-error" *ngIf="xlFormGroup.get(xlField.name).hasError(validation.name) && xlFormGroup.get(xlField.name).invalid && (xlFormGroup.get(xlField.name).dirty || xlFormGroup.get(xlField.name).touched)">
                <p>{{validation.message }}</p>
            </div>
          </ng-container>

          <div class="xl__input-hint" *ngIf="hint">{{hint}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./xl-input-phonenumber.component.scss']
})

export class XLInputPhoneNumberComponent implements OnInit {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() value?: string;
  @Input() required?: any;
  @Input() maxlength?: string;
  @Input() minlength?: string;

  @Input() xlField?: FieldConfig;
  @Input() xlFormGroup?: FormGroup;

  togglePasswordField: boolean = false;

  constructor(private fb: FormBuilder) { }

  // ngOnInit() {
  ngOnInit() {
    // console.log('Phonenumber test', this.xlField);
    //Working regx to capture starts with 0 or 62: tested regx: 
    // for starts with 0 or 62 only 
    // /^(?:0|62)d{0,}$/
    // for starts with 0 or 62 or +62
    // ^(?:0|62|+62)d{0,}$
    
    const validList = [
      Validators.pattern(/^(?:(?:\+|0{0,2})62(\s*[\ -]\s*)?|[0]?)?[0]|[62]\d$/),
      // Validators.pattern(/^[0-9]{6,15}$/),
    ];

    if (this.xlFormGroup && this.xlField.name) {
      this.xlFormGroup.controls[this.xlField.name].setValidators(validList);
      // this.xlFormGroup.controls[this.xlField.name].updateValueAndValidity();
    }

  }

}
