import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Теперь вы можете зайти в систему', 'success');
      }
    });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  // TODO rewrite creating object Message
  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.loginForm.value;
    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      console.log(user);
      if (user) {
        if (user.password !== formData.password) {
          this.showMessage('Пароль не верный');
        } else {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          // this.router.navigate(['']);
        }
      } else {
        this.showMessage('Пользователь не найден');
      }
    });
  }

}
