
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Injectable()

export class XLFormService {

  constructor(private fb: FormBuilder) { 
    // console.log('initiate XlFormService');
  }

  mockTest (flag: boolean) {
    if(flag) {
      return { positive: true }
    }
     else {
       return {negative: true }
     }
  }

  createFormGroupControl(formFields: any) {
    const group = this.fb.group({});

    formFields.forEach(field => {
      // console.log('each field is: ', field);
      if (field.inputType === "button") return;

      if(!field.validations) return;

      // console.log('field.validations ', field.validations);

      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    // console.log('arrived validations ', validations);

    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        valid['validator'] =  valid.name === 'required' ? Validators.required : null,
        validList.push(valid.validator);
      });
      
      // console.log('validList ', validList);

      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}