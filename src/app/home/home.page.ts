import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';



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
    usuario: '',
    password: '',
  };

 errormsj='';
  constructor(  private router: Router,
                private auth: AuthService) {}
                conectar() {
                  if (this.user.usuario.length > 0 && this.user.password.length > 0) {
                    this.auth.loginAPI(this.user.usuario, this.user.password).then((res) => {
                      if (res) {
                        let navigationExtras: NavigationExtras = {
                          state: { user: this.user },
                        };
                        this.errormsj = 'Conexion Exitosa';
                       
                        setTimeout(() => {
                          this.router.navigate(['/perfil'], navigationExtras);
                          this.errormsj = '';
                        }, 3000);
                      } else {
                        this.errormsj = 'Contraseña o usuario incorrectos';
                      }
                    });
                  } else {
                    this.errormsj = 'Los espacios no pueden estar vacios';
                  }
                }
    
    
  }



