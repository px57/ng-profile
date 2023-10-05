import { Component } from '@angular/core';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfigSignup } from '../../types';
import { FormsService } from 'src/modules/form/services/forms.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  /**
   * @description: 
   */
  public formGroup: FormGroup;

  /**
   * @description: 
   */
  public config: ConfigSignup;

  /**
   * @description: 
   */
  public httpResponse: any = {};

  constructor(
    public switchModalService: SwitchModalService,
    public httpService: HttpService,
    public authService: AuthService,
    public formService: FormsService,
  ) {
    this.config = this.authService.config__signup;
    this.formGroup = this.generateFormGroup();
  }

  /**
   * @description: 
   */
  private generateFormGroup(): FormGroup {
    const inputList = this.config.inputList;
    const formGroup: any = {};

    inputList.forEach((input) => {
      formGroup[input.name] = new FormControl('');
    });

    return new FormGroup(formGroup);
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
      username: this.formGroup.value.username,
    };

    this.httpService.post('auth/signup', params).subscribe((response: any) => {
      this.httpResponse = response;
      if (!response.success) {
        return; 
      }
      this.config.eventAfterSignup(response);
    });
  }
}
