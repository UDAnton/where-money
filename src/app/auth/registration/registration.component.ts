import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private usersService: UsersService, private  router: Router) {
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(null, [Validators.required, Validators.requiredTrue]),
    });
  }

  onSubmit() {

    const {email, password, name} = this.registrationForm.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user)
      .subscribe((newUser: User) => {
        console.log(newUser);
        this.router.navigate(['login'], {queryParams: {nowCanLogin: true}});
      });
  }

}
