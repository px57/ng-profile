import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/modules/profile/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './../../../../templates/profile/auth/logout/logout.component.html',
  styleUrls: [
    './../../../../templates/profile/auth/logout/logout.component.scss',
  ]
})
export class LogoutComponent {
  /**
   * @description:
   */
  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  /**
   * @description: 
   */
  public constructor(
    public userService: UserService
  ) {

  }

  /**
   * @description:
   */
  public logout(): void {
    this.userService.logout();
  }

  /**
   * @description:
   */
  public cancel(): void { 
    this.close.emit();
  }
}
