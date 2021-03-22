import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user: User;

  constructor() {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
  }

  handleRegister(form: any) {
    console.log(this.user);
  }

}
