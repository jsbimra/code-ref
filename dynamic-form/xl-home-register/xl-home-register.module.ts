import { NgModule } from '@angular/core';
import { XlHomeRegisterComponent } from './xl-home-register.component';
import { CommonService } from '../../services/common.service';
import { ConstantService } from '../../services/constant.service.beta';
import { XlFormModule } from '../xl-form/xl-form.module';

@NgModule({
  declarations: [XlHomeRegisterComponent],
  imports: [
    XlFormModule,
  ],
  entryComponents: [XlHomeRegisterComponent],
  exports: [XlHomeRegisterComponent],
  providers: [CommonService, ConstantService]
})

export class XlHomeRegisterModule { }
