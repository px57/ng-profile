import { Component } from '@angular/core';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './../../../../templates/profile/auth/forget-password/forget-password.component.html',
  styleUrls: [
    './../../../../templates/profile/auth/forget-password/forget-password.component.scss',
  ]
})
export class ForgetPasswordComponent {
  /**
   * @description: 
   */
  public formGroup: FormGroup;

  /**
   * @descsription: 
   */
  public httpResponse: any = {};

  constructor(
    public switchModalService: SwitchModalService,
    public httpService: HttpService,
    public authService: AuthService,
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl('projeta618@gmail.com'),
      password: new FormControl(''),
    });
  }

  /**
   * @description:
   */
  public submit(): void {
    if (this.formGroup.invalid) { return; }
    
    // -> [API] - Signin
    const params = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };
    this.httpService.post('auth/forget-password', params).subscribe((response: any) => {
      this.httpResponse = response;
      if (!response.success) {
        return; 
      }
      this.authService.config__forget_password.eventAfterForgetPassword(this); 
    });
  }
}
