import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) { }

  onSubmit(event, email, password) {
    console.log('You submitted a value, email: '+email+', password: '+password);
    event.preventDefault();
    this.userService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }
}
