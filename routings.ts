import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from 'src/modules/profile/components/signin/signin.component';
import { SignupComponent } from 'src/modules/profile/components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { FrgpasswordChangePasswordComponent } from './components/frgpassword-change-password/frgpassword-change-password.component';

export const profile__routes: Routes = [
    {
        'path': 'auth/signin',
        'component': SigninComponent,
    },
    {
        'path': 'auth/signup',
        'component': SignupComponent,
    },
    {
        'path': 'auth/forget-password',
        'component': ForgetPasswordComponent,
    },
    {
        'path': 'auth/frgpassword-change-password/:token',
        'component': FrgpasswordChangePasswordComponent,
    }
  ];