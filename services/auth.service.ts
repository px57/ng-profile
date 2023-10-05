import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { 
  ConfigSignin, 
  ConfigSignup, 
  ConfigForgetPassword 
} from '../types'; 


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

  /**
   * @description: 
   */
  public config__signup: ConfigSignup = {
    redirectToPathname: '/',
    eventAfterSignup: () => {
      const redirectToPathname = this.config__signin.redirectToPathname;
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
        placeholder: `My Username`,
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
    redirectToPathname: ['/', 'dashboard'],
    eventAfterForgetPassword: () => {
      this.router.navigate([this.config__forget_password.redirectToPathname]);
    },
  };

  /**
   * @description: 
   */
  constructor(
    private router: Router,
  ) { }

}
