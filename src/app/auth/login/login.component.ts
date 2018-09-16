import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }

  submit(forma: any) {
    console.log('entrro al submit');
    console.log(forma);
      if (forma.invalid) {
        return;
      }
      this._authService.logIn(forma.email, forma.password);
  }
}
