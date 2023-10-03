import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { LibsService } from 'src/modules/tools/services/libs.service';

// DOC: Il s'agit ici de l'éléments permet de définir l'état d'avancements de la créations d'un profiles.
export interface TP_completeProfile {
  show: boolean
  percent: number
  nextStep: string
  stepPosition: number
  stepLength: number
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(
    private userService: UserService,
    private router: Router,
    private h: HttpService,
    private l: LibsService,
  ) {

  }

  /*
  * @description:
  */
  public redirectAfterSignup(data: any): void {

  }

  /*
  * @description: Envoyer une requêtes pour indiquer que le profile is complete
  */
  public sendCompleteProfile(): void {
    this.h.get('profile/complete_profile').subscribe((response: any) => {
      if (!response.success) {
        
        return;
      }
    });
  }
}
