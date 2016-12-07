import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from '../_services/chat.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styles: [`
  md-card {
    margin: 5px;
  }
   .left
    {
        float: left;
        margin-left: 50px;
    }

    .right
    {
        float: right;
        margin-right: 50px;
    }
  `]
})
export class ChatComponent implements OnInit {
  messages = [];
  userId = 1;
  arrayFakeMessageForCompany = ['I want you tonight', 'You are fired', 'Run!!',
  'ET. Phone. Home', 'Houston, we have a problem', 'To infinity and beyond!',
  'I will be back.', 'I see dead people', 'Bond, James Bond.'];

  ngOnInit() {
    this.chatService.loadOMessages()
    .subscribe((result) => {
      this.messages = result;
    });
  }

  sendButtonClick(message: String): void {
    if (message) {
      let messageObject = {id: -1,
                  senderId: 1,
                  date: 5,
                  content: message,
                  entityName: 'Frank'};
      this.messages.push(messageObject);
      setTimeout(() => {
        this.sendFakeMessageCompany();
      }, 2000);
    }
  }

  sendFakeMessageCompany(): void {
    let responseFromCompany = this.arrayFakeMessageForCompany[Math.floor(Math.random() * this.arrayFakeMessageForCompany.length)];
    let messageObject = {id: -1,
                  senderId: -1,
                  date: 5,
                  content: responseFromCompany,
                  entityName: 'Airbus'};
    this.messages.push(messageObject);
  }

  constructor(private chatService: ChatService, private userService: UserService, private router: Router) { }
}
