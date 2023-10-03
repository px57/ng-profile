import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/modules/profile/services/user.service';
import { FileService } from 'src/app/services/file.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { UploadService, UploadSettings } from 'src/modules/uploadmanager/services/upload.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-avatar-update',
  templateUrl: './avatar-update.component.html',
  styleUrls: ['./avatar-update.component.scss']
})
export class AvatarUpdateComponent {
  /**
   * @description: 
   */
  private upload_settings: UploadSettings = {
    type: 'single',
    label: 'avatar',
    file_type: 'image',
    max_file_size: ( 25 * 1024 ) * 1024,
    is_private: true,
    progress: 0,
    file_list: [],
    stream: new Subject()
  };

  /**
   * @description:
   */
  constructor(
    private upload_service: UploadService,
    private userService: UserService,
  ) { }
 
  /**
   * @description:
   */
  public ngOnInit(): void {
    this.upload_settings.stream.subscribe((stream: any) => {
      if (stream.event === 'finished') { 
        this.userService.update_avatar(stream.data.file);
      }
    });
  }

  /**
   * @description:
   */
  public update_avatar($event: any) {
    this.upload_service.clickButtonUpload(this.upload_settings).then((upload_object: any) => {
      // alert(upload_object);
    });
  }
}