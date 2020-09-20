import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  input;

  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {}

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
          this.toaster.success(
            `User ${this.input.username} is logged in!`,
            '',
            {
              timeOut: 5000,
            }
          );
          setTimeout(() => {
            window.location.href = '/user';
          }, 3000);
        }
      },
      (error) => {
        console.log(error.error);
        if (!this.input.username) {
          this.toaster.error(`Username is required!`, '', {
            timeOut: 5000,
          });
        } else if (!this.input.password) {
          this.toaster.error(`Password is required!`, '', {
            timeOut: 5000,
          });
        } else if (this.input.username.length <= 3) {
          this.toaster.error(
            `Username should be greater than 3 characters!`,
            '',
            {
              timeOut: 5000,
            }
          );
        } else if (!this.input) {
          this.toaster.error(`All fields are required!`, '', {
            timeOut: 5000,
          });
        } else {
          this.toaster.error(`Username or password is incorrect!`, '', {
            timeOut: 5000,
          });
        }
      }
    );
  }
}
