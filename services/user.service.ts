import { Injectable, ɵɵgetInheritedFactory } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/modules/tools/services/http.service';
import { LibsService } from 'src/modules/tools/services/libs.service';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';

export interface Avatar {
  src: string,
};

export interface Profile {
  id: number,
  avatar: Avatar,
  group: string,
  is_anonymous: boolean,
  username: string,
  first_name: string,
  last_name: string,
};

interface TP_userData {
  success: boolean;
}

@Injectable()
export class UserService {
  /**
   * @description:
   */
  public stream: Subject<any> = new Subject();

  public REDIRECT_ONBOARDING = true;


  /*
   * @description:
   */
  constructor(
    private router: Router,
    public _h: HttpService,
    public l: LibsService,
    public switchModalService: SwitchModalService,
  )
  {
    (window as any).userService = this;
    this._h.userService = this;
  }

  /*
   * @description:
   */
  public registrationForm: any = {
    first: FormGroup,
    second: FormGroup,
  };

  /*
   * @description:
   */
  public logout(): any { 
    this._h.get('v1/auth/logout/').subscribe((res: any) => {
      window.location.reload();
    });
  }

  /*
   * @description:
   */
  public not_is_authenticated(): boolean {
    return !this.is_authenticated();
  }

  /*
   * @description:
   */
  public is_authenticated(): boolean {
    return this.data.is_authenticated;
  }

  /**
   * @description: 
   */
  public data_is_loaded(): boolean {
    return this.data.is_authenticated !== undefined;
  }

  /*
   * @description:
   */
  public belongToGroup(group: any): boolean {
    if (!this.is_authenticated()) {
      return false;
    }

    return this.data.user.group === group;
  }

  /**
   * @description:
   */
  public is_me(compareWith: string, value: any): boolean {
    if (!this.is_authenticated()) {
      return false;
    }

    if (
      compareWith === 'id' &&
      ['string', 'number'].indexOf(typeof value) !== -1 &&
      this.data.user.id === parseInt(value, 0)
    ) {
      return true;
    }
    return false;
  }

  /*
   * @description:
   */
  public is_professional(profile: any = null): boolean {
    const group: any = this.get_my_group(profile);
    return group === 'pro';
  }

  /*
   * @description:
   */
  public is_creator(profile: any = null): boolean {
    const group: any = this.get_my_group(profile);
    return group === 'creator';
  }

  /*
   * @description:
   */
  public is_customer(profile: any = null): boolean {
    const group: any = this.get_my_group(profile);
    return group !== null && group === 'customer';
  }

  /*
   * @description:
   */
  public is_staff(profile: any = null): boolean {
    const group: any = this.get_my_group(profile);
    return group !== null && group === 'staff';
  }

  /*
   * @description:
   */
  public is_pro_or_creator(profile: any = null): boolean {
    const group: any = this.get_my_group(profile);
    return (
      (group !== null && this.is_creator(profile)) ||
      this.is_professional(profile)
    );
  }

  //############################ [GLOBAL-DATA-BEGIN]

  /*
   * @description:
   */
  public data: any = {
    success: false,
  };

  /*
   * @description:
   */
  public reset_data(): void {

  } // Remettre l'element à null

  /*
   * @description:
   */
  public data_loaded(): boolean {
    return this.data.success;
  }

  /*
   * @description:
   */
  public set_data(data: any): void {
    this.data = data;
    if (data.data === null) {
      return;
    }

    this.stream.next(data.user);
  }

  /*
   * @description:
   */
  public get_id(): number {
    let data = this.get_data();

    if (!data.hasOwnProperty('user') || !data.user.hasOwnProperty('id')) {
      return 0;
    }
    return data.user.id;
  }

  /*
   * @description: Il s'agit ici de récupérer la video de ce profile
   */
  public get_my_profile_video(profile: any = null): string {
    if (profile === null) {
      profile = this.data.profile;
    }
    const defaultVideoUrl = '';
    if (profile.profile_video !== undefined) {
      return profile.profile_video.video;
    }
    return defaultVideoUrl;
  }

  /**
   * @description:
   */
  public get_my_group(profile: any = null): string | undefined {
    if (profile !== null) {
      return profile.group;
    }
    if (!this.is_authenticated()) {
      return undefined;
    }
    return this.data.profile.group;
  }

  /**
   * @description:
   */
  public get_in_user(key: any): string | undefined {
    const user = this.data.user;
    if (user === undefined) {
      return undefined;
    }
    if (!user.hasOwnProperty(key)) {
      return undefined;
    }
    return user[key];
  }

  /**
   * @description:
   */
  public drop_in_user(key: any): boolean {
    if (this.data.user === undefined) {
      return false;
    }
    if (this.data.user[key] === undefined) {
      return false;
    }
    this.data.user[key] = undefined;
    return true;
  }

  /**
   * @description:
   */
  public change_settings_data: Subject<any> = new Subject();

  /**
   * @description:
   */
  public change_data: Subject<any> = new Subject();

  /**
   * @description:
   */
  public list_component_update_data: any[] = [];

  /**
   * @description:
   */
  public bind_change_data(componentOrService: any): void {
    this.list_component_update_data.push(componentOrService);
  }

  /*
   * @description:
   */
  public send_event_change_data() {
    for (let componentOrService of this.list_component_update_data) {
      if (!componentOrService.hasOwnProperty('bindChangeGlobalData')) {
        continue;
      }
      componentOrService.bindChangeGlobalData();
    }
  }

  /*
   * @description:
   */
  public update_data() {
    return this._h.get('v1/auth/me/').pipe(
      map((response) => {
        this.send_event_change_data();
        this.set_data(response);
        return response;
      })
    );
  }

  /*
   * @description:
   */
  public get_data(): any {
    const invitation = this.get_in_user('invitation');
    if (invitation) {
      this.drop_in_user('invitation');
      // this.invitation.get_data(invitation, this.get_my_group());
    }

    return this.data;
  }

  /*
   * @description:
   */
  public getSettings(): any {
    return this.data.profile.settings;
    // return {
    //   'notification': {
    //     'before_your_video_call': true,
    //     'wishlist_activity': true,
    //     'talkto_promotionnal_offer': true,
    //   }
    // };
  }

  /*
   * @description: Récupérer le profile de cette personnes.
   */
  public getProfile(profile = null): any {
    if (profile !== null) {
      return profile;
    }
    return this.data.profile;
  }

  /*
   * @description:
   */
  public get_profile_url(profile: any): string {
    return `/profile/${profile.username}`;
  }

  /*
   * @description: Si l'utilisateurs n'est pas connecter alors ont le redirige vers la pages de logins.
   */
  public redirectToLogin__IfLogout(): boolean {
    if (this.is_authenticated()) {
      return false;
    }

    this.open_login_modal();
    return true;
  }

  /**
   * @description: 
   */
  public redirectToSignup__IfLogout(): boolean {
    if (this.is_authenticated()) {
      return false;
    }
    this.open_signup_modal();
    return true;
  }

  /*
   * @description: Permet de savoir si l'images est part défaut
   */
  public hasProfilePicture(profile = null): boolean {
    profile = this.getProfile(profile);
    const images: string = this.data.profile.profile_picture;
    const defaultPicture: string = `assets/assets/img/user1.jpg`;

    try {
      return images.split('/').splice(-4).join('/') !== defaultPicture;
    } catch {
      return true;
    }
    return true;
  }

  /*
   * @description: Regarde s'il y a une video de presentations.
   */
  public hasVideoProfile(profile: any = null): boolean {
    profile = this.getProfile(profile);

    if (profile.profile_video === undefined) {
      return false;
    }

    if (
      profile.profile_video.hasOwnProperty('type') &&
      profile.profile_video.type === 'default'
    ) {
      return false;
    }

    // if (!profile.profile_video.cropped) {
    //   return false;
    // }
    return true;
  }

  /*
   * @description:
   */
  public hasVideoPriceConfigured(profile: any = null): boolean {
    profile = this.getProfile(profile);
    const price = profile.price;
    return price.price.length !== 0;
  }

  /*
   * @description:
   */
  public updateVideo(video: any): void {
    this.data.profile.profile_video = video;
  }

  /*
   * @description:
   */
  public getSocialNetWorkIco(): void {}

  /*
   * @description: Récupérer le bon réseaux social.
   */
  public getSocialNetWorkUrl(profile: any, key = `instagram`): string {
    const social_network_list = profile.social_network_list;
    const index = social_network_list.findIndex((x: any) => x.key === key);
    if (index === -1) {
      return ``;
    }
    return social_network_list[index].url;
  }

  /*
   * @description:
   */
  public clickSocialNetWork(socialNetwork: any): void {
    let url = socialNetwork.url;
    if (url.substring(0, 4) !== 'http') {
      url = `http://${url}`;
    }
    window.open(url, `_blank`, ``);
  }

  /*
   * @description:
   */
  private openEmailValidator = false;

  /*
   * @description:
   */
  // public openEmailValidatorPage(): void {
  //   if (this.openEmailValidator) {
  //     return;
  //   }

  //   const profile = this.getProfile();
  //   if (!profile.email_validate) {
  //     this.openEmailValidator = true;
  //     this.openCloseElementService.openEmailValidator();
  //   }
  // }

  /*
   * @description: Rediriger l'utilisateurs vers le profile qui lui est lier.
   */
  public redirectToProfile(profile: any): void {
    if (!this.is_pro_or_creator(profile)) {
      return;
    }
    this.l.navigateByUrl(profile.username);
  }

  /*
   * @description:
   */
  public getApiKey(keyName: string): any {
    if (this.data.API.hasOwnProperty(keyName)) {
      return this.data.API[keyName];
    }
    return undefined;
  }

  /*
   * @description:
   */
  public phoneNumberIsEmpty(): boolean {
    const profile = this.getProfile();
    return (
      profile.phone_number.country_code === null ||
      profile.phone_number.number === null
    );
  }

  /*
   * @description:
   */
  public isAnonymousProfile(): boolean {
    const profile = this.getProfile();
    return profile.anonymous;
  }

  /*
   * @description:
   */
  public notAccessForAnonymousProfile(): boolean {
    if (this.isAnonymousProfile()) {
      this.router.navigateByUrl(`/`);
      return true;
    }
    return false;
  }

  /**
   * @description:
   */
  public strapiSendForgetPaswordEmail(email: string): Observable<any> {
    return this._h.post(`${this.getApiKey('strapi')}/auth/forgot-password`, {
      email,
    });
  }

  /**
   * @description:
   */
  public setJwtToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  /**
   * @description:
   */
  public getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  /**
   * @description:
   */
  public dropJwtToken(): void {
    localStorage.removeItem('jwt');
  }

  /**
   * @description:
   */
  public hasJwtToken(): boolean {
    return this.getJwtToken() !== null;
  }

  /**
   * @description:
   */
  public getLanguage(): 'en' | 'fr' {
    if (this.data === undefined) {
      return 'en';
    }

    if (this.data.data === undefined) {
      return 'en';
    }

    if (this.data.data.user === undefined) {
      return 'en';
    }

    return this.data.data.user.language;
  }

  /**
   * @description:
   */
  public langIsFr(): boolean {
    return this.getLanguage() === 'fr';
  }

  /**
   * @description:
   */
  public langIsEn(): boolean {
    return this.getLanguage() === 'en';
  }

  /**
   * @description:
   */
  public setLanguage(language: string): void {
    const params = {language};
    this._h.post(`profiles/change_language/`, params).subscribe((res: any) => {
      window.location.reload();
    });
  }

  /**
   * @description:
   */
  public get_first_name(): string {
    return this.data.data.user.user.first_name;
  }

  /**
   * @description:
   */
  public get_last_name(): string {
    return this.data.data.user.user.last_name;
  }

  /**
   * @description:
   */
  public get_email(): string {
    return this.data.data.user.user.email;
  }

  /**
   * @description:  
   */
  public profileHasOnboarded(): boolean {
    if (this.data.data === undefined) {
      return false;
    }
    return this.data.data.onboarding;
  }

  /**
   * @description:
   */
  public open_login_modal() {
    this.switchModalService.open_modal('login');
  }

  /**
   * @description: 
   */
  public open_signup_modal() {
    this.switchModalService.open_modal('signup');
  }

  /**
   * @description:
   */
  public open_forget_password_modal() {
    this.switchModalService.open_modal('forget_password');
  }

  /**
   * @description:
   * @param.profile 
   */
  public get_avatar(profile: Profile | undefined = undefined): any {
    const default_avatar = {
      src: 'assets/assets/img/user1.jpg',
    };
  
    if (profile === undefined) {
      profile = this?.data?.profile;

    } 

    if (profile === undefined) {
      return; 
    }

    if (profile.avatar === undefined || profile.avatar === null) {
      return default_avatar;
    }
    return profile.avatar;
  }

  /**
   * @description: 
   */
  public update_avatar(avatar: any) {
    this.data.profile.avatar = avatar;
  }
}
