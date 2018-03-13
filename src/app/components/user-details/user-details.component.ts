import { Component, OnInit } from '@angular/core';
import { ProfileManagementService } from '../../services/profile-management.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  data: Object;
  id: number;
  currentFilter: string;

  constructor(private service: ProfileManagementService) { }

  ngOnInit() {
    this.service.currentUser.subscribe(response => {
      if(response) {
        this.id = response[0]['id'];
        this.data = response[0]['details'];
      }
    });
    this.service.currentFilter.subscribe(response => {
      let filter = response;
      this.currentFilter = filter ? filter : 'all';
    });
  }

  changeStatus(id: number, status: string) {
    this.service.changeStatus(id, status, this.currentFilter);
  }
}
