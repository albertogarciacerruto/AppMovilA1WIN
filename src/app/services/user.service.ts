import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Variables Globales 
  token:any;
  usuarios:any[] = [];
  user_find:any[] = [];

  //Rutas de conexión via API REST LARAVEL
  apiUrl_users = this.env.API_URL + 'users';
  apiUrl_register_user = this.env.API_URL + 'register_user';
  apiUrl_delete_user = this.env.API_URL + 'remove_user/';
  apiUrl_search_user = this.env.API_URL + 'search_user/';
  apiUrl_update_user = this.env.API_URL + 'update_user';
  apiUrl_lock_user = this.env.API_URL + 'lock_user/';
  apiUrl_unlock_user = this.env.API_URL + 'unlock_user/';

  
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController, 
    private router: Router,
    private productService: ProductService) {

  }

  //Método que encuentra todos los usuarios registrados en el sistema.
  getUsers(){
    let url = this.apiUrl_users;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              console.log(data)
              this.usuarios = [];
              this.usuarios.push( ... data['users']);
             },
             error =>{
               console.error(error);
             });
  }

  //Método para registrar nuevos usuarios en el sistema.
  register_user(name: String, last_name: String, identification_number: String, type: String, email: String, password: String) {
    return this.http.post(this.apiUrl_register_user,
      {name: name, lastname: last_name, identification_number: identification_number, type: type, email: email, password: password}
    );
  }

  //Método que encuentra al usuario el Id del usuario conectado
  search_user(user_id: string){
    let url = this.apiUrl_search_user + user_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              this.user_find = [];
              this.user_find = data['users'];
              this.getUsers();
              console.log(this.user_find);
             },
             error =>{
              this.presentAlert('Error', 'Imposible enocntrar al usuario seleccionado.');
             });
  }

  //Método ppara actualizar información de un usuario en particular
  update_user(name: String, last_name: String, identification_number: String, type: String, email: String, id: String, password: String) {
    return this.http.post(this.apiUrl_update_user,
      {name: name, lastname: last_name, identification_number: identification_number, type: type, email: email, id: id, password: password}
    );
  }

  //Método que eliminar a un usuario del sistema.
  delete_user(user_id:string) {
    return this.http.get(this.apiUrl_delete_user + user_id);
  }

  //Método para bloquear a un usuario.
  lock_user(user_id: string){
    let url = this.apiUrl_lock_user + user_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              this.presentAlert('Exito', 'Usuario bloqueado con exito.');
              this.productService.getClients();
             },
             error =>{
              console.log(error);
              this.presentAlert('Error', 'Imposible bloquear al usuario.');
             });
  }

  //Método para desbloquear a un usuario.
  unlock_user(user_id: string){
    let url = this.apiUrl_unlock_user + user_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              this.presentAlert('Exito', 'Usuario desbloqueado con exito.');
              this.productService.getClients();
             },
             error =>{
               console.log(error);
              this.presentAlert('Error', 'Imposible desbloquear al usuario.');
             });
  }

  //Método genérico y asíncrono para mostrar PopUp.
  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
    message: text,
    subHeader: title,
    buttons: ['OK']
   });
   await alert.present(); 
  }
}
