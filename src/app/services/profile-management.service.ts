import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../classes/user';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';

/**
 * A service that handles profile data connects to the random user 
 * generator api, and organizes state through localStorage
 */

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
      this.id = (!_users) ? 0 : _users[_users.length - 1].id;
    });
  }

  /**
   * Connects and gets one random user from https://randomuser.me/api/
   * The api endpoint is saved in the environments configuration
   * (/src/environments/)
   */
  getRandomUserFromApi() {
    return this.http.get(environment.apiUrl);
  }

  /**
   * Adds a new user to localStorage.
   * 
   * @param {User} newUser New user from api
   */
  addUserToState(newUser: User): void {
    this.id++;
    let _userList;
    this.getUsersFromState().then(resolve => {
      _userList = (!resolve) ? [] : resolve['userList'];

      _userList.push({ id: this.id, details: newUser });
      this.setToLocalStorage(_userList);
      this.userList.next(_userList);
    }).catch((error) => {
      throw new Error('Error: ' + error.message);
    });
  }

  /**
   * Retrieve users from localStorage
   */

  getUsersFromState(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('userList')));
    });
  }

  /**
   * Get a single user from localStorage
   * @param {number} id Selected user ID
   */

  getUser(id: number): void {
    this.getUsersFromState().then(resolve => {
      let _items = (!resolve) ? [] : resolve['userList'];
      let _item = _items.filter(item => item.id === id);
      this.currentUser.next(_item);
    }).catch((error) => {
      throw new Error('Error: ' + error.message);
    });
  }

  /**
   * Filter users by status: all/active/deleted
   * @param {string} filter Filter toggle
   */

  filterUserList(filter: string): void {
    this.getUsersFromState().then(resolve => {
      let _items = (!resolve) ? [] : resolve['userList'];
      if (filter !== 'all') {
        _items = _items.filter(item => item.details.status === filter);
      }
      this.userList.next(_items);
    }).catch((error) => {
      throw new Error('Error: ' + error.message);
    });
  }

  /**
   * Updates user status to active or deleted
   * @param {number} id Selected user ID
   * @param {string} status Status change if active or deleted
   * @param {string} currentFilter keeps track of current filter value and
   * notifies all observers of the change in status
   */

  changeStatus(id: number, status: string, currentFilter: string): void {
    this.getUsersFromState().then(resolve => {
      let _items = resolve['userList'];
      Object.keys(_items).forEach(key => {
        if (_items[key].id === id) {
          _items[key].details.status = status;
        }
      });
      this.setToLocalStorage(_items);
      this.getUser(id);
      this.filterUserList(currentFilter);
    }).catch((error) => {
      throw new Error('Error: ' + error.message);
    });
  }

  /**
   * Saves current user list to localStorage
   */

  setToLocalStorage(data: Object): void {
    localStorage.setItem('userList', JSON.stringify({ userList: data }));
  }
}
