import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  usuario:any;
  type:any;
  email: any;
  pass:any;

  constructor(
    private http: HttpClient,
    //private storage: NativeStorage,
    private storage: Storage,
    private env: EnvService,
  ) { }

  //Método para hacer login y verificar el token de seguridad enviado desde laravel con Passport
  login(email: String, password: String) {
    console.log('llego: ', email, password);
    return this.http.post(this.env.API_URL + 'login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.set('token', token).then(
          () => {
            console.log('Token Stored');
          },
          error => {
          	console.error('Error storing item');
        });
        this.storage.set('user', token['id_user']).then(
          () => {
            console.log('User Stored');
          },
          error => {
          	console.error('Error storing User');
        });
        this.storage.set('type', token['id_type']).then(
          () => {
            console.log('Type Stored');
          },
          error => {
          	console.error('Error storing Type');
        });
        this.storage.set('email', token['email']).then(
          () => {
            console.log('Email Stored');
          },
          error => {
          	console.error('Error storing item');
        });
        this.storage.set('pass', token['password']).then(
          () => {
            console.log('Pass Stored');
          },
          error => {
          	console.error('Error storing item');
        });
        this.token = token;
        this.usuario = token['id_user'];
        this.type = token['user_type'];
        this.email = token['email'];
        this.pass = token['password'];
        this.isLoggedIn = true;
        return token;
      }),
    );

  }

  //Método para registrar un nuevo usuario en el sistema.
  register(name: String, last_name: String, identification_number: String, type: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {name: name, last_name: last_name, identification_number: identification_number, type: type, email: email, password: password}
    )
  }

  //Método para hacer Logout de la aplicacion borran el token del usuario en el sistema.
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.storage.remove("user");
        this.storage.remove("type");
        this.storage.remove("email");
        this.storage.remove("pass");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  //Método que encuentra al usuario que inicio sesión en el sistema.
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  //Método para obtener el token de seguridad al hacer sesión en la aplicación.
  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}
