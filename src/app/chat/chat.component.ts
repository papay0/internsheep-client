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
    indexMessage = 0;
    arrayFakeMessageForCompany = ['Hi, I received your resume and I would like to set up a phone screen interview. When are you available for a 30 minutes call?',
        'Alright, I have your number, I will Facetime you in 2 minutes.', 'I spoke to the manager and we decided to propose you the position, congrats!', 'You are welcome, see you soon!'];

    ngOnInit() {
        this.user.login = this.userService.getLogin();
        /*this.chatService.getMessages(this.student.login, this.company.login, this.offer.id).subscribe((result) => {
            this.messages = result;
        });*/
    }

    sendButtonClick(message: String): void {
        if (message) {
            let messageObject = {
                sender: this.user.login,
                date: Date.now(),
                message: message
            };
            this.messages.push(messageObject);
            setTimeout(() => {
                this.sendFakeMessageCompany();
            }, 2000);
            /*this.chatService.newMessage(this.student.login, this.company.login, this.offer.id, messageObject)
            .subscribe(() => {});
            setTimeout(() => {
                this.sendFakeMessageCompany();
            }, 2000);*/
        }
    }

    sendFakeMessageCompany(): void {
        let responseFromCompany = this.arrayFakeMessageForCompany[this.indexMessage];
        let messageObject = {
            sender: this.company.login,
            date: Date.now(),
            content: responseFromCompany,
            entityName: this.company.name
        };
        this.messages.push(messageObject);
        this.indexMessage += 1;
    }

    constructor(private chatService: ChatService, private userService: UserService, private router: Router) { }
}
