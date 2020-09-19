import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register;

  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {}

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
          this.toaster.success(
            `User ${this.register.username} registered successfully!`,
            '',
            {
              timeOut: 5000,
            }
          );

          setTimeout(() => {
            window.location.href = '/django-angular-auth-api/login';
          }, 3000);
        }
      },
      (error) => {
        console.log(error.error);
        if (!this.register.username) {
          this.toaster.error(`Username is required!`, '', {
            timeOut: 5000,
          });
        } else if (!this.register.password) {
          this.toaster.error(`Password is required!`, '', {
            timeOut: 5000,
          });
        } else if (!this.register) {
          this.toaster.error(`All fields are required!`, '', {
            timeOut: 5000,
          });
        } else {
          console.log(error.error.username);
          this.toaster.error(error.error.username);
        }
      }
    );
  }
}
