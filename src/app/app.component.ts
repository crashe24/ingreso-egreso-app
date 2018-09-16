import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingreso-egreso';

  constructor(public _authService: AuthService) {
    this._authService.initAuthListener();
  }
}
