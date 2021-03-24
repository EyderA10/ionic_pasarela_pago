import { Component, DoCheck, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, DoCheck {

  public user: any;

  constructor(
    private apiAuth: ApiAuthService,
  ) {
  }

  ngOnInit() {
  }

  ngDoCheck(): any {
    this.user = this.apiAuth.getUser();
  }

  logout(): void {
    this.apiAuth.logout();
  }

}
