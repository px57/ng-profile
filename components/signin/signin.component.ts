import { 
    Component, 
    Input, 
    Output, 
    EventEmitter,
    Inject,
} from '@angular/core';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfigSignin } from '../../types';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  /**
   * @description: 
   */
  public formGroup: FormGroup;

  /**
   * @description:
   */
  public config: ConfigSignin;

  /**
   * @description:
   */
  public httpResponse: any = {};

  constructor(
    public switchModalService: SwitchModalService,
    public httpService: HttpService,
    public authService: AuthService,
  ) {
    this.config = this.authService.config__signin;
    this.formGroup = this.getFormGroup();
  }

  /**
   * @description: 
   */
  private getFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  /**
   * @description:
   */
  public ngOnInit() {  }

  /**
   * @description:
   */
  public submit(): void {
    if (this.formGroup.invalid) { return; }
    
    // -> [API] - Signin
    const params = {
      identifier: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };
    this.httpService.post('auth/signin', params).subscribe((response: any) => {
      this.httpResponse = response;
      if (!response.success) {
        return;
      }

      this.config.eventAfterSignin();
    });
  }
}
