import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { ProfileManagementService } from '../../services/profile-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private data: Object;
  order: string = 'id';
  reverse: boolean = true;
  filter: string = '';
  selectedUserId: number;

  constructor(private service: ProfileManagementService) { }

  ngOnInit() {
    this.service.getUsersFromState().then(resolve => {
      this.data = (!resolve) ? [] : resolve['userList'];
    });
    this.service.userList.subscribe(response => {
      this.data = response;
    })
  }

  getUser(id: number) {
    this.service.getUser(id);
    this.selectedUserId = id;
  }
}
