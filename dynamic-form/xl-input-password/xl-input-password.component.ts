import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../util/interface/field.config';

@Component({
  selector: 'xl-input-password',
  template: `
    <div class="form-group" [formGroup]="xlFormGroup">
      <label>{{ label }} <span *ngIf="required" class="uppercase">*</span></label>

      <div class="xl__input-group password-show-hide-wrap">
        <input class="xl__input" 
            autocomplete="off"
            [class.field-bg]="bgImage === 'true' || bgImage === true"
            [name]="xlField.name"
            [formControlName]="xlField.name"
            [type]="!togglePasswordField ? 'password' : 'text'"
            [placeholder]="placeholder"
            [value]="value"
            [required]="required !== '' && required !== undefined  ? true : false"
            xlHighlightFormControl 
          />
          <div class="password-show-hide-icon">
              <img src="assets/eye.svg" class="field-icon image__size" (click)="togglePasswordField = !togglePasswordField"  />
          </div>
          <ng-container *ngFor="let validation of xlField.validations;">
            <div class="xl__input-error" *ngIf="xlFormGroup.get(xlField.name).hasError(validation.name) && xlFormGroup.get(xlField.name).invalid && (xlFormGroup.get(xlField.name).dirty || xlFormGroup.get(xlField.name).touched)">
                <p>{{validation.message }}</p>
            </div>
          </ng-container>

          <div class="xl__input-hint" *ngIf="hint">{{hint}}</div>
      </div>
    </div>
  `,
  styleUrls: ['./xl-input-password.component.scss']
})

export class XLInputPasswordComponent implements OnInit {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() value?: string;
  @Input() required?: any;
  @Input() bgImage?: any;

  @Input() xlField?: FieldConfig;
  @Input() xlFormGroup?: FormGroup;

  togglePasswordField: boolean = false;

  constructor(private fb: FormBuilder) { }

  // ngOnInit() {
  ngOnInit() {
    const validList = [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)];
    if (this.xlFormGroup && this.xlField.name) {
      this.xlFormGroup.controls[this.xlField.name].setValidators(validList);
      // this.xlFormGroup.controls[this.xlField.name].updateValueAndValidity();
    }
  }

}
