import { Component } from '@angular/core';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(
    public switchModalService: SwitchModalService,
    public httpService: HttpService,
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
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
      identifier: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };
    this.httpService.post('auth/signin', params).subscribe((response: any) => {
      if (!response.success) {
        return;
      }
      return window.location.reload();
    });
  }
}
