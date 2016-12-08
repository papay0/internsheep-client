import { Component } from '@angular/core';
import { NotificationsService } from '../_services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: [`
  md-card {
    margin: 20px;
  }
  `]
})
export class NotificationsComponent {
  constructor(private notificationsServive: NotificationsService) { }
}
