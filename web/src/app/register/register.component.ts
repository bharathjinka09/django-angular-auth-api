import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.register = {
      username: '',
      password: '',
      email: '',
    };
  }

  registerUser() {
    this.userService.registerUser(this.register).subscribe(
      (response) => {
        if (this.register) {
          console.log(response, 'response');
          alert(`User ${this.register.username} is created!`);
          window.location.href = '/login';
        }
      },
      (error) => {
        console.log(error.error);
        if (!this.register.username) {
          // alert(error.error.username);
          alert('Username is required!');
        } else if (!this.register.password) {
          // alert(error.error.password);
          alert('Password is required!');
        } else if (!this.register) {
          alert('All fields are required!');
        } else {
          alert(error.error.username);
        }
      }
    );
  }
}
