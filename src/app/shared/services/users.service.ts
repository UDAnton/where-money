import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get(`http://localhost:3000/users?email=${email}`).pipe(map(data => {
      return data[0];
    }));
  }

  createNewUser(user: User): Observable<User> {
    return this.httpClient.post(`http://localhost:3000/users`, user).pipe(map(data => {
      return data[0];
    }));
  }

}
