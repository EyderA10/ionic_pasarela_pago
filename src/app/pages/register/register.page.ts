import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { Router } from '@angular/router';
import validator from 'validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user: User;
  public err: any;
  public token: string;

  constructor(
    private router: Router,
    private apiAuth: ApiAuthService,
  ) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
  }

  handleRegister(form: any): any {

    const errss = this.formValid();

    if (errss.length === 0) {
      this.apiAuth.signUp(this.user).subscribe(
        response => {

          if (response.status === 'success') {

            localStorage.setItem('auth-token', response.token);
            localStorage.setItem('auth-user', JSON.stringify(response.user));

            this.router.navigateByUrl('/user');
          }
        },
        error => {
          alert('Lo siento, este email ya existe');
          console.log(error);
        }
      );
    } else {
      errss.forEach((errr: string) => {
        alert(errr);
      });
    }

  }

  private formValid(): Array<string> {
    const { name, email, password, confirm } = this.user;
    const errors: any = [];

    if (name.trim().length === 0 || Number(name)) {
      errors.push('el nombre es requerido o debe contener letras');
    }

    if (!validator.isEmail(email) || email.trim().length === 0) {
      errors.push(`Este email ${email} es invalido o debe ser requerido!!`);
    }

    if (password.length > 10) {
      errors.push('la contraseña debe ser menor o igual a 10 caracteres!!');
    }

    if (password !== confirm) {
      errors.push('las contraseña no son iguales por favor ingresa correctamente la contraseña');
    }
    return errors;
  }


}
