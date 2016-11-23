import { Component, OnInit, NgZone } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { ToastService } from '../_services/toast.service';


@Component({
  selector: 'app-files-manager',
  templateUrl: 'files-manager.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  .file-over { border: dotted 3px red; }
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  `]
})
export class FilesManagerComponent implements OnInit {
  CVs = [];

  private zone: NgZone;
  private options: Object;
  progress: number = 0;
  private response: any = {};

  editState = {
    label: 'Update',
    editionMode: true,
    inputDisabled: false,
    color: 'primary'
  };
  readState = {
    label: 'Edit',
    editionMode: false,
    inputDisabled: true,
    color: 'accent'
  };
  stateButtonFileManager = this.readState;
  states = {};

  ngOnInit() {
    this.profileService.loadCVs().subscribe((result) => {
      this.CVs = result;
      for (let CV of this.CVs) {
        this.states[CV.id] = this.readState;
      }
    });

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.options = {
      url: '/api/upload',
      filterExtensions: true,
      allowedExtensions: ['image/png', 'image/jpg', 'pdf'],
      calculateSpeed: true,
      data: {
        userId: 12,
        isAdmin: true
      },
      customHeaders: {
        'custom-header': 'value'
      },
      authToken: 'fake-jwt-token',
      authTokenPrefix: 'Bearer'
    };
  }

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent;
    });
  }

  editButtonClick(CV): void {
    let id = CV.id;
    if (!this.states[id].editionMode) {
      this.states[id] = this.editState;
    } else {
      this.states[id] = this.readState;
      this.toastService.displayToast('Updated!');
    }
  }

  constructor(private profileService: ProfileService, private toastService: ToastService) { }
}
