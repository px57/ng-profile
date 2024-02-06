import { Component, Input, Output, EventEmitter, Inject } from '@angular/core'
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service'
import { HttpService } from 'src/modules/tools/services/http.service'
import { FormGroup, FormControl, Form } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { FormsService } from 'src/modules/form/services/forms.service'
import { ConfigSignin } from '../../types'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl:
    './../../../../templates/profile/auth/signin/signin.component.html',
  styleUrls: [
    './../../../../templates/profile/auth/signin/signin.component.scss'
  ]
})
export class SigninComponent {
  /**
   * @description:
   */
  public formGroup: FormGroup

  /**
   * @description:
   */
  public config: ConfigSignin

  /**
   * @description:
   */
  public httpResponse: any = {}

  constructor(
    public switchModalService: SwitchModalService,
    public httpService: HttpService,
    public authService: AuthService,
    public formService: FormsService,
    public userService: UserService,
    private router: Router
  ) {
    this.config = this.authService.config__signin
    this.formGroup = this.getFormGroup()
  }

  /**
   * @description:
   */
  private getFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  /**
   * @description:
   */
  public ngOnInit() {}

  /**
   * @description:
   */
  public submit(): void {
    if (this.formGroup.invalid) {
      return
    }

    // -> [API] - Signin
    const params = {
      identifier: this.formGroup.value.email,
      password: this.formGroup.value.password
    }
    this.httpService.post('auth/signin', params).subscribe((response: any) => {
      this.httpResponse = response
      if (!response.success) {
        return
      }

      const userId = this.userService.get_profile_id(); // Certifique-se de que isto retorna o ID do usuário correto
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // Criar um objeto com 'user_id'
      const body = JSON.stringify({ user_id: userId });
  
      this.userService.post('settingsverify', body, { headers }).subscribe({
          next: (response: any) => {
            if (response.exists) {
              // Se o registro existe, redirecionar para '/'
              this.router.navigate(['/']);
          } else {
              // Se não existe, redirecionar para '/profile-setting'
              this.router.navigate(['/profile-setting']);
          }
          },
          error: (error: any) => {
              console.error(error);
          }
      });
      this.config.eventAfterSignin()
    })
  }
}