import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupService } from './services/signup.service';
import { UserService } from './services/user.service';
import { ToolsModule } from 'src/modules/tools/tools.module';
import { FormModule } from '../form/form.module';

import { AvatarUpdateComponent } from './components/avatar-update/avatar-update.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LogoutComponent } from './components/logout/logout.component'; 
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ModalModule } from 'src/modules/modal/modal.module';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AvatarUpdateComponent,
    ForgetPasswordComponent,
    LogoutComponent,
    UpdatePasswordComponent,
    UpdateProfileComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ToolsModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ModalModule,
  ],
  providers: [
    UserService,
    AuthService,
  ],
  exports: [
    AvatarUpdateComponent,
    ForgetPasswordComponent,
    LogoutComponent,
    UpdatePasswordComponent,
    UpdateProfileComponent,
    SigninComponent,
    SignupComponent,
  ]  
})
export class ProfileModule {

}
