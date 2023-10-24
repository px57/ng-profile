import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/modules/tools/services/http.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './../../../../templates/profile/management/update-password/update-password.component.html',
  styleUrls: [
    './../../../../templates/profile/management/update-password/update-password.component.scss',
  ]
})
export class UpdatePasswordComponent {

  /**
   * @description: 
   */
  @Output()
  public changeField: EventEmitter<any> = new EventEmitter();

  /**
   * @description: 
   */
  public formGroup: FormGroup;

  constructor(
    private httpService: HttpService
  ) {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  /**
   * @description:
   */
  public ngSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    // alert ('aoeuaoe');
    this.httpService.post(
      'auth/update-password', 
      this.formGroup.value
    ).subscribe((response: any) => {
      if (!response.success) {
        return;
      }
      // alert ('aeouaoue');
    });
  }
}
