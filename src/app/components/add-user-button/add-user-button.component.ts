import { Component, OnInit } from '@angular/core';
import { ProfileManagementService } from '../../services/profile-management.service';
import { User } from '../../classes/user';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

/**
 * Add button for generating random user via api
 */

@Component({
  selector: 'app-add-user-button',
  templateUrl: './add-user-button.component.html',
  styleUrls: ['./add-user-button.component.scss'],
  providers: [CapitalizePipe]
})
export class AddUserButtonComponent implements OnInit {
  private ucfirst;

  constructor(private service: ProfileManagementService, private capitalize: CapitalizePipe) { }

  ngOnInit() {
    this.ucfirst = this.capitalize.transform;
  }

  addUser(btnElement) {
    btnElement.textContent = 'Loading...';
    btnElement.disabled = true;

    let _User: User;
    this.service.getRandomUserFromApi().subscribe(response => {
      // The "rd" variable is short for responseDetails
      let _rd = response['results'][0];

      _User = {
        name: {
          title: this.ucfirst(_rd.name.title),
          first: this.ucfirst(_rd.name.first),
          last: this.ucfirst(_rd.name.last)
        },
        location: {
          street: _rd.location.street,
          city: _rd.location.city,
          state: _rd.location.state,
          postcode: _rd.location.postcode,
        },
        email: _rd.email,
        username: _rd.login.username,
        dob: _rd.dob,
        picture: {
          large: _rd.picture.large,
          medium: _rd.picture.medium,
          thumbnail: _rd.picture.thumbnail
        },
        status: 'active'
      }
      this.service.addUserToState(_User);
      btnElement.textContent = 'Add User';
      btnElement.disabled = false;
    },
    error => {
      throw new Error('Error: ' + error.message);
    });
  }

}
