
import { Injectable } from '@angular/core';
import { Resolve,
         ActivatedRoute,
         Router } from '@angular/router';

import { HttpService } from 'src/modules/tools/services/http.service';
import { UserService } from 'src/modules/profile/services/user.service';

interface offers {
    success: boolean
};

@Injectable()
export class GlobalResolver implements Resolve<offers>{
  public route: any;
  public state: any;

  constructor(
    private router: Router,
    private user: UserService,
    public activatedRoute: ActivatedRoute,
    private httpService: HttpService,
   ) {}

    public response: any;

    public resolve(): Promise<offers> {
        return new Promise((resolve) => {
          this.response = resolve;
          this.route = this.activatedRoute.snapshot;
          this.state = this.router.routerState;
          
          if (!this.user.data_loaded()) {
            this.user.update_data().subscribe((response: any) => {
              this.callback.bind(this);
              resolve({success: true});
              return;
            });
          } else {
            this.callback();
            resolve({success: true});
          }

        });
    }

    public callback(): void {
      const data = this.user.get_data();
      this.response(data);
    }
}
