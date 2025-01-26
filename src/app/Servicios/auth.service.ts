import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { APIService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static isLogged: boolean = false;
  private storage: LocalStorageService = new LocalStorageService();
  private api: APIService = new APIService();
  constructor() {}

  async loginAPI(user: string, pass: string): Promise<boolean> {
    let us = await firstValueFrom(this.api.login(user));
    if (us.length == 0) {
      us = await firstValueFrom(this.api.logCorreo(user));
    }
    if (us.length > 0) {
      if (
        (us[0].username == user || us[0].correo == user) &&
        us[0].pass == pass
      ) {
        this.storage.setItem('conectado', us[0]);
        return true;
      } else {
        return false;
      }
    } else {
      console.log('llamada vacia');
      return false;
    }
  }

  registrar(user: string, correo: string, pass: string) {
    const listaUsuarios = this.storage.getItem('users') || [];
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      return false;
    }
    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
    listaUsuarios.push(nuevoUsuario);
    this.storage.setItem('users', listaUsuarios);
    return true;
  }
  /*  */
  async registerAPI(
    user: string,
    correo: string,
    pass: string
  ): Promise<boolean> {
    const users = await firstValueFrom(this.api.listarUsuarios());
    const exists =
      users.find((us: any) => us.username == user || us.correo == correo) !=
      null;
    if (exists) {
      return false;
    }

    const nuevoUsuario = {
      id: users.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
    await this.api.register(nuevoUsuario).subscribe();

    return true;
  }

  isConnected(): boolean {
    return this.storage.getItem('conectado') !== null;
  }

  logout() {
    this.storage.removeItem('conectado');
  }
}
