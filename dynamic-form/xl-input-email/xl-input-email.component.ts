import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../util/interface/field.config';

@Component({
  selector: 'xl-input-email',
  template: `
    <div class="form-group" [formGroup]="xlFormGroup">
      <label>{{ label }} <span *ngIf="required" class="uppercase">*</span></label>

      <div class="xl__input-group">
          <input class="xl__input" 
              autocomplete="off" 
              type="email"
              [formControlName]="xlField.name"
              [name]="xlField.name"
              [id]="xlField.name"
              [placeholder]="placeholder"
              [value]="value"
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
  styleUrls: ['./xl-input-email.component.scss']
})
export class XLInputEmailComponent implements OnInit {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() required?: any;

  @Input() xlField?: FieldConfig;
  @Input() xlFormGroup?: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // console.log('xl-input-email xlField.name ', this.xlField.name);
    const validList = [Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)];

    if (this.xlFormGroup && this.xlField.name) {
      this.xlFormGroup.controls[this.xlField.name].setValidators(validList);
      // this.xlFormGroup.controls[this.xlField.name].updateValueAndValidity();
    }
  }

}
