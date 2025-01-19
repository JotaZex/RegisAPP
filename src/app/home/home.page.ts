import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  pulseState = 'normal';

  togglePulse() {
    this.pulseState = this.pulseState === 'normal' ? 'large' : 'normal';
  }

  user = {
    username: '',
    password: '',
  };

 errormsj='';

  constructor(private router: Router) {}
  validar(){
    if (this.user.username.length > 0 && this.user.password.length > 0) {
      if (
        this.user.username == 'jpablo' &&
        this.user.password == 'pass1234'
      ) {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user },
        };                  
        this.router.navigate(['/perfil'], navigationExtras);
      } else {
        this.errormsj = 'Contraseña o usuario incorrecto';
        console.log('Contraseña o usuario incorrecto');
      }
    } else {
      this.errormsj = 'Los espacios no pueden estar vacios';
      console.log('Los espacios no pueden estar vacios');
    }
  }
    
    
  }



