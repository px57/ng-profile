import { Component } from '@angular/core';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    //this.snackBar.open('Teste SnackBar', 'Fechar', { duration: 3000000000000000000000000000 });
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
      if (response.success) {
        this.snackBar.open('Email envoyé', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['auth/signin'],);
       
      }
      if(response.error){
        this.snackBar.open('Adresse Email incorrecte', 'Fermer', {
          duration: 3000
        });
  
      }


      
      //this.authService.config__forget_password.eventAfterForgetPassword(this); 
    });
  }
}
