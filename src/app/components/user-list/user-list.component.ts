import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { ProfileManagementService } from '../../services/profile-management.service';

/**
 * User listing component in sidebar
 */

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  data: Object;
  order: string = 'id';
  reverse: boolean = true;
  filter: string = '';
  selectedUserId: number;

  constructor(private service: ProfileManagementService) { }

  ngOnInit() {
    this.service.getUsersFromState().then(resolve => {
      this.data = (!resolve) ? [] : resolve['userList'];
    }).catch((error) => {
      throw new Error('Error: ' + error.message);
    });

    this.service.userList.subscribe(response => {
      this.data = response;
    },
    error => {
      throw new Error('Error: ' + error.message);
    });
  }

  getUser(id: number) {
    this.service.getUser(id);
    this.selectedUserId = id;
  }
}
