import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);  
  const toastController = inject(ToastController);  
  const router = inject(Router);  

  
  const isLoggedIn = await authService.isConnected();
  console.log('Usuario logeado:', isLoggedIn); 

  if (isLoggedIn) {
    return true;  
  } else {
    const toast = await toastController.create({
      message: 'Debe estar logeado para acceder.',
      duration: 2000,  
      position: 'bottom'
    });
    toast.present();

    router.navigate(['/home']);
    return false;  
  }
};