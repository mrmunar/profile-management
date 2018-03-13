import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../classes/user';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class ProfileManagementService {
  private id: number;
  userList = new BehaviorSubject<Object>(null);
  currentUser = new BehaviorSubject<Array<any>>(null);
  currentFilter = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { 
    let _users;
    this.getUsersFromState().then(resolve => {
      _users = (!resolve) ? null : resolve['userList'];
      this.id = (!_users) ? 0 : _users[_users.length-1].id;
    });
  }

  getRandomUserFromApi() {
    return this.http.get(environment.apiUrl);
  }

  addUserToState(newUser: User) {
    this.id++;
    let _userList;
    this.getUsersFromState().then(resolve => {
      _userList = (!resolve) ? [] : resolve['userList'];

      _userList.push({id: this.id, details: newUser});
      this.setToLocalStorage(_userList);
      this.userList.next(_userList);
    });
  }

  getUsersFromState() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('userList')));
    });
  }

  getUser(id: number) {
    this.getUsersFromState().then(resolve => {
      let _items = (!resolve) ? [] : resolve['userList'];
      let _item = _items.filter(item => item.id === id);
      this.currentUser.next(_item);
    });
  }

  filterUserList(filter: string) {
    this.getUsersFromState().then(resolve => {
      let _items = (!resolve) ? [] : resolve['userList'];
      if(filter !== 'all') {
        _items = _items.filter(item => item.details.status === filter);
      }
      this.userList.next(_items);
    });
  }

  changeStatus(id: number, status: string, currentFilter: string) {
    this.getUsersFromState().then(resolve => {
      let _items = resolve['userList'];
      Object.keys(_items).forEach(key => {
        if(_items[key].id === id) {
          _items[key].details.status = status;
        }
      });
      this.setToLocalStorage(_items);
      this.getUser(id);
      this.filterUserList(currentFilter);
    });
  }

  setToLocalStorage(data) {
    localStorage.setItem('userList', JSON.stringify({userList: data}));
  }
}
