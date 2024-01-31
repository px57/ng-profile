import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/modules/tools/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-password',
  templateUrl: './../../../../templates/profile/management/update-password/update-password.component.html',
  styleUrls: [
    './../../../../templates/profile/management/update-password/update-password.component.scss',
  ]
})


export class UpdatePasswordComponent implements OnInit {

  /**
   * @description: 
   */
  @Output()
  public changeField: EventEmitter<any> = new EventEmitter();

  /**
   * @description: 
   */
  public formGroup: FormGroup;
  resetToken: any;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      resetToken: new FormControl('') 
    });
    

    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.resetToken = token; // Salve o token em uma variável para uso posterior
      }
    });
  }

  /**
   * @description:
   */
  public ngSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    console.log(this.resetToken)
    
    const updatePasswordData = {
      resetToken: this.resetToken,  // Inclua o token capturado
      password: this.formGroup.value.password,
      confirmPassword: this.formGroup.value.confirmPassword
    };
  
    this.httpService.post2('auth/verify_token', updatePasswordData).subscribe(
      (response: any) => {
        console.log(updatePasswordData);
        this.snackBar.open('Senha Alterada', 'Fermer', { duration: 3000 });
        this.router.navigate(['auth/signin'],);
      },
      (error: any) => {
        console.error(error);
        if (error.error && error.error.error === 'Passwords do not match') {
          this.snackBar.open('Senhas diferentes', 'Fermer', { duration: 3000 });
        } else {
          // Outro tipo de erro
          this.snackBar.open('Erro ao alterar senha', 'Fermer', { duration: 3000 });
        }
      }
    );

  
    console.log(updatePasswordData)
  }
}
