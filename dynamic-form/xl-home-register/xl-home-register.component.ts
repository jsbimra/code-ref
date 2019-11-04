import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XLFormService } from '../../util/xlForm.service';

@Component({
  selector: 'xl-home-register',
  templateUrl: './xl-home-register.component.html',
  styleUrls: ['./xl-home-register.component.scss']
})

export class XlHomeRegisterComponent implements OnInit {
  @Input() public data: any;
  @Input() public language: any;
  @Input() public bg: any;
  @Input() public formpos: any;
  @Input() public bgform: any;
  @Input() public title: any;
  @Input() public subtitle: any;

  processingRequest: Boolean = false; //temp change to true should be false
  successFlag: Boolean = false;
  resErrorMessage: any = null;
  xlForm: FormGroup;
  formFields: any;

  get value() {
    return this.xlForm.value;
  }

  constructor(private fb: FormBuilder, private xlFormService: XLFormService,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  createForm() {

    this.formFields = [
      {
        name: 'email',
        value: this.data.email.value || '',
        validations: [
          {
            name: 'required',
            message: this.data.email.validation.required_msg
          },
          {
            name: 'pattern',
            message: this.data.email.validation.pattern_msg
          }
        ]
      },
      {
        name: 'password',
        value: this.data.password.value || '',
        validations: [
          {
            name: 'required',
            message: this.data.password.validation.required_msg
          },
          {
            name: 'pattern',
            message: this.data.password.validation.pattern_msg
          }
        ]
      },
      {
        name: 'name',
        value: this.data.name.value || '',
        validations: [
          {
            name: 'required',
            message: this.data.name.validation.required_msg
          }
        ]
      },
      {
        name: 'phonenumber',
        value: this.data.phonenumber.value || '',
        validations: [
          {
            name: 'required',
            message: this.data.phonenumber.validation.required_msg
          },
          {
            name: 'pattern',
            message: this.data.phonenumber.validation.pattern_msg
          }
        ]
      },
      {
        name: 'captchaCode',
        validations: [
          {
            name: 'required',
            message: this.data.captcha.validation.required_msg
          }
        ]
      },
      {
        name: 'btnSubmit',
        value: this.data.submitButton.value || '',
        disabled: this.processingRequest,
      }
    ];

    //create reactive form
    this.xlForm = this.xlFormService.createFormGroupControl(this.formFields);

    console.log('Form created is: ', this.xlForm);

  }

  ngOnInit() {
    if(!this.data) {
      this.data = {
        email : {
          label: "Email",
          value: "",
          placeholder: "Input your email",
          required: true,
          validation: {
            required_msg: "Email is required",
            pattern_msg: "Invalid email",
          }
        },
        password : {
          label: "Password",
          value: "",
          placeholder: "Input your password",
          hint: "At least 8 characters, include number & special character",
          required: true,
          validation: {
            required_msg: "Password is required",
            pattern_msg: "Invalid password pattern",
          }
        },
        name: {
          label: 'Name',
          name: 'name',
          value: "",
          required: true,
          placeholder: 'Input your name here',
          validation: {
            required_msg: "Name is required",
          }
        },
        phonenumber : {
          label: "Phone Number",
          value: "",
          placeholder: "Input your phone number here",
          hint: "",
          minlength: 6,
          maxlength: 15,
          required: true,
          validation: {
            required_msg: "Phone number is required",
            pattern_msg: "Invalid phone number",
          }
        },
        captcha: {
          label: "",
          validation: {
            required_msg: "Required captcha validation",
          }
        },
        terms_check: {
          desc_text_1: "By creating your account, you agree to XL Axiata's",
          desc_text_2: "&",
          desc_link_text_1: "Terms and Conditions",
          desc_link_text_2: "Privacy Policy",
          desc_link_1: "#",
          desc_link_2: "#",
          desc_link_1_target: '_blank',
          desc_link_2_target: '_blank',
        },
        login_desc: {
          desc_text_1: "Already have an account?",
          desc_link_text_1: "Login",
          desc_link_1: "#",
          desc_link_1_target: '_blank',
        },
        submitButton: {
          label: "Register",
          name: "btnSubmit",
          type: "submit",
          value: "",
        }
      };
    }

    if(this.data) {
      this.createForm();
      // console.log('Init form values: ', this.xlForm.value);
    }
  }

  // onChanges(): void {
  //   this.xlForm.valueChanges.subscribe(val => {
  //     console.log('value changes detected ', val);
  //   });
  // }

  onFormSubmit(event: Event) {
    this.changeDetectorRef.detectChanges();
    
    console.log('form submit triggered! is form valid: ', this.xlForm.valid);

    console.log('Init form values: ', this.xlForm.value);

    if (this.xlForm.valid) {
      this.xlForm.value['token'] = localStorage['token'] ? localStorage['token'] : 'value not found from localStorage';

      console.log('form ', this.xlForm);
      console.log('form value ', this.xlForm.value);
      
      //Temp code to check processingRequest
      this.processingRequest = true;

      setTimeout(() => {
          this.processingRequest = false;
      }, 6000);

      // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.xlForm.value, null, 4));

      // const sentMessage_en = `Registered Successfully`;
      // const sentMessage_id = `Terdaftar dengan Sukses`;
      // this.sentMessage = this.language === "en" ? sentMessage_en : sentMessage_id

      const postPayload: any = this.xlForm.value;

      // this.comService.processPostRequest(postPayload, this.constService.ENTERPRISE_REGISTER_ENDPOINT);

      // this.comService.$data.subscribe(resp => {
      //   console.log('subscribe data, ', resp);

      //   //mock response until service is ready  - TEMP - JAT
      //   // FOR SUCCESS
      //   // resp['isFetching'] = true;
      //   // resp['isFetched'] = true;
      //   // resp['status'] = { code: 200 };
      //   // resp.status.statusMessage = 'ok';

      //   //FOR ERROR
      //   // resp['isFetching'] = true;
      //   // resp['isFetched'] = false;
      //   // resp['status'] = { code: 401};
      //   // resp.status.statusMessage = 'UNAUTHORIZED';
      //   // resp.status.result = {
      //   //   error: "Sorry, error"
      //   // }

      //   if (resp.isFetching) {
      //     this.processingRequest = true;
      //   }

      //   if (resp.isFetched && resp.status) {
      //     if (resp.status.statusMessage.toUpperCase() === "OK") {
      //       //show success message code
      //       this.resErrorMessage = null;
      //       this.successFlag = true;
      //       this.processingRequest = false;
      //     }
      //   } else {
      //     this.successFlag = false;

      //     if (resp.status && resp.status.statusMessage.toUpperCase() === "UNAUTHORIZED") {
      //       this.resErrorMessage = resp.status && resp.status.result && resp.status.result.error ? resp.status.result.error : null;
      //     }

      //     if (!resp.isFetching) {
      //       this.processingRequest = false;
      //     }
      //   }

      // });
    }
    else {
      // this.verifyCaptcha();
      this.xlFormService.validateAllFormFields(this.xlForm);
    }
  }

}
