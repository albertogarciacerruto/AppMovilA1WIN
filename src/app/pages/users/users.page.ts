import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { UserService } from 'src/app/services/user.service';

import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  textoBuscar = '';
  user_find:any;
  type:string;

  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private userService: UserService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService) {
  	this.menu.enable(true);
  }

  ngOnInit() {
    this.type = JSON.stringify(this.authService.token.user_type);
    console.log(this.type);
    this.storage.get('token').then((val) => {console.log('Your token is', val);})
    this.userService.getUsers();
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  bloquear_usuario(user_id: string){
    this.userService.lock_user(user_id);
    this.ngOnInit();
  }

  desbloquear_usuario(user_id: string){
    this.ngOnInit();
    this.userService.unlock_user(user_id);
    this.ngOnInit();
  }

  borrar_usuario(user_id: string){
    this.userService.delete_user(user_id).subscribe( data => {
    this.presentAlert('Exito', data["mensaje"]);
    this.userService.getUsers();
    this.ngOnInit();
    },
    error => {
      this.presentAlert('Error', 'Imposible completar solicitud');
    });
  }

  search_user(user_id: string){
    this.userService.search_user(user_id);
    this.navCtrl.navigateRoot('/update-user');
  }

  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
    message: text,
    subHeader: title,
    buttons: ['OK']
   });
   await alert.present(); 
}

refreshPage(){
  this.userService.getUsers();
}

}
