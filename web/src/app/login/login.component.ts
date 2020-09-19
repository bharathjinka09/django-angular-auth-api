import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  input;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.input = {
      username: '',
      password: '',
      email: '',
    };
  }

  loginUser() {
    this.userService.loginUser(this.input).subscribe(
      (response) => {
        console.log(response);
        if (this.input) {
          console.log(response, 'response');
          alert(`User ${this.input.username} is logged in!`);
          window.location.href = '/user';
        }
      },
      (error) => {
        console.log(error.error);
        if (!this.input.username) {
          // alert(error.error.username);
          alert('Username is required!');
        } else if (!this.input.password) {
          // alert(error.error.password);
          alert('Password is required!');
        } else if (!this.input) {
          alert('All fields are required!');
        } else {
          alert('Username or password is incorrect!');
        }
      }
    );
  }
}
