import { Component, OnInit } from '@angular/core';
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
    userId = '';
    studentId = '';
    companyId = '';
    offerId = '';
    arrayFakeMessageForCompany = ['I want you tonight', 'You are fired', 'Run!!',
        'ET. Phone. Home', 'Houston, we have a problem', 'To infinity and beyond!',
        'I will be back.', 'I see dead people', 'Bond, James Bond.'];

    ngOnInit() {
        this.userId = this.userService.getLogin();
        this.chatService.getMessages(this.studentId, this.companyId, this.offerId)
            .subscribe((result) => {
                this.messages = result;
            });
    }

    sendButtonClick(message: String): void {
        if (message) {
            let messageObject = {
                sender: this.userId,
                date: Date.now(),
                message: message,
                entityName: 'Frank'
            };
            this.messages.push(messageObject);
            this.chatService.newMessage(this.studentId, this.companyId, this.offerId, messageObject)
            .subscribe(() => {});
            setTimeout(() => {
                this.sendFakeMessageCompany();
            }, 2000);
        }
    }

    sendFakeMessageCompany(): void {
        let responseFromCompany = this.arrayFakeMessageForCompany[Math.floor(Math.random() * this.arrayFakeMessageForCompany.length)];
        let messageObject = {
            sender: this.companyId,
            date: Date.now(),
            content: responseFromCompany,
            entityName: 'Airbus'
        };
        this.messages.push(messageObject);
    }

    constructor(private chatService: ChatService, private userService: UserService, private router: Router) { }
}
