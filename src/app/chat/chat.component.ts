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
    user = { login: '' };
    student = { login: 'vincent' };
    company = { login: 'airbus', name: 'Airbus' };
    offer = { id: 'a' };
    arrayFakeMessageForCompany = ['I want you tonight', 'You are fired', 'Run!!',
        'ET. Phone. Home', 'Houston, we have a problem', 'To infinity and beyond!',
        'I will be back.', 'I see dead people', 'Bond, James Bond.'];

    ngOnInit() {
        this.user.login = this.userService.getLogin();
        this.chatService.getMessages(this.student.login, this.company.login, this.offer.id)
            .subscribe((result) => {
                this.messages = result;
            });
    }

    sendButtonClick(message: String): void {
        if (message) {
            let messageObject = {
                sender: this.user.login,
                date: Date.now(),
                message: message
            };
            this.messages.push(messageObject);
            this.chatService.newMessage(this.student.login, this.company.login, this.offer.id, messageObject)
            .subscribe(() => {});
            setTimeout(() => {
                this.sendFakeMessageCompany();
            }, 2000);
        }
    }

    sendFakeMessageCompany(): void {
        let responseFromCompany = this.arrayFakeMessageForCompany[Math.floor(Math.random() * this.arrayFakeMessageForCompany.length)];
        let messageObject = {
            sender: this.company.login,
            date: Date.now(),
            content: responseFromCompany,
            entityName: this.company.name
        };
        this.messages.push(messageObject);
    }

    constructor(private chatService: ChatService, private userService: UserService, private router: Router) { }
}
