import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/modules/tools/services/http.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {

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
    private httpService: HttpService,
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  /**
   * @description:
   */
  public ngSubmit(): void {
    if (!this.formGroup.valid) {
      return; 
    }
    this.httpService.post(
      'auth/update_profile', 
      this.formGroup.value
    ).subscribe((response: any) => {
      if (!response.success) {
        return;
      }
      alert ('aeouaoue');
    });
  }
}
