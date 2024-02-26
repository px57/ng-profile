import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { 
  ConfigSignin, 
  ConfigSignup, 
  ConfigForgetPassword 
} from '../types';
import { FormsService } from 'src/modules/form/services/forms.service';
// import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/modules/tools/services/http.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * @description: 
   */
  public config__signin: ConfigSignin = {
    redirectToPathname: '/',
    eventAfterSignin: () => {
      const redirectToPathname = this.config__signin.redirectToPathname;
      if (typeof redirectToPathname === 'string') { 
        window.location.href = redirectToPathname;
      } else {
        this.router.navigate(redirectToPathname);
      }
    },
  };


  signIn(email: string, password: string): void {
    const params = { identifier: email, password: password };
    this.http.post('auth/signin', params).subscribe((response: any) => {
      if (response.success) {

        this.config__signin.eventAfterSignin();
      } else {
        // Handle the error case
        console.error('Sign-in failed', response);
      }
    });
  }

  /**
   * @description: 
   */
  public config__signup: ConfigSignup = {
    redirectToPathname: '/profile-setting',
    eventAfterSignup: () => {
      const redirectToPathname = this.config__signup.redirectToPathname;
      if (typeof redirectToPathname === 'string') { 
        window.location.href = redirectToPathname;
      } else {
        this.router.navigate(redirectToPathname);
      }
    },
    inputList: [
      {
        name: 'username',
        required: true,
        placeholder: $localize `My Username`,
      },
      {
        name: 'email',
        required: true,
        placeholder: `Myemail@gmail.com`,
      },
      {
        name: 'password',
        required: true,
        placeholder: '********',
      }
    ]
  };

  /**
   * @description: 
   */
  public config__forget_password: ConfigForgetPassword = {
    redirectToPathname: ['auth', 'signin'],
    eventAfterForgetPassword: (component: any) => {
      this.router.navigate([this.config__forget_password.redirectToPathname]);
    },
  };

  /**
   * @description: 
   */
  constructor(
    private router: Router,
    private formsService: FormsService,
    private http: HttpService, // Inject HttpClient
  ) {
    this.defineConvertFormError();
  }


  /**
   * @description: Set the error message for the form.
   */
  private defineConvertFormError(): void {
    this.formsService.setConvertFormError({
      email: {
        email_exists: $localize`This email address is already in use.`,
        exists: $localize`This email address is already in use.`,
        invalid: $localize`The email address is invalid.`,
        required: $localize`This field is required.`,
        not_encountered: $localize`This email address is not registered.`,
        'Enter a valid email address.': $localize`The email address is invalid.`,
      },
      password: {
        password_is_alpha: $localize`Password must contain at least one number.`,
        password_is_numeric: $localize`Password must contain at least one letter.`,
        password_too_long: $localize`Password must contain at most 128 characters.`,
        password_too_short: $localize`Password must contain at least 8 characters.`,
        password_is_lower: $localize`Password must contain at least one uppercase letter.`,
        password_has_space: $localize`Password must not contain spaces.`,
        required: $localize`This field is required.`,
      },
      first_name: {
        required: $localize`This field is required.`,
      },
      last_name: {
        required: $localize`This field is required.`,
      },
      __signin__: {
        not_exists: $localize`Please fill in your email and password to sign in`,
        profile_dont_exists: $localize`Please go to the admin panel to create your profile`,
      },
    })
  }
}
