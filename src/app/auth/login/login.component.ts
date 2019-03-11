import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      console.log(user);
      if (user) {

        if (user.password !== formData.password) {
          alert('Пользователь не найден');
        } else {
          // login
        }
      } else {
        alert('Пользователь не найден');
      }
    });
  }

}
