import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { RoutingService } from '../_services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginError: boolean = false;
  loginErrorMessage: string = 'Invalide login or password!';
  onSubmit(event, email, password) {
    console.log('[login] You submitted a value, email: ' + email + ', password: ' + password);
    event.preventDefault();
    this.userService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate([this.routingService.getLandingPage()]);
      } else {
        this.loginError = true;
      }
    });
  }
  constructor(private userService: UserService, private router: Router, private routingService: RoutingService) { }
}
