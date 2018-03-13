import { Component, OnInit } from '@angular/core';
import { ProfileManagementService } from '../../services/profile-management.service';

@Component({
  selector: 'app-filter-toogle',
  templateUrl: './filter-toogle.component.html',
  styleUrls: ['./filter-toogle.component.scss']
})
export class FilterToogleComponent implements OnInit {
  selectedBtn: string;

  constructor(private service: ProfileManagementService) { }

  ngOnInit() {
  }

  filterList(filter: string) {
    this.selectedBtn = filter;
    this.service.filterUserList(filter);
    this.service.currentFilter.next(filter);
  }
}
