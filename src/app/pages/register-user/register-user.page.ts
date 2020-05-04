import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { UserService } from 'src/app/services/user.service';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  user: User = {
    id: '',
    name: '',
    last_name: '',
    identification_number: '',
    type: '',
    email: '',
    password: ''
  };

  usuario: string;


  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private userService: UserService,
    private authService: AuthService,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
    this.menu.enable(true);
    }


  ngOnInit() {
    this.usuario = JSON.stringify(this.authService.token.id_user);
    console.log(this.user);
    }

  users(){
    this.userService.getUsers();
  }


  register_user(form: NgForm) {
    this.userService.register_user(form.value.name, form.value.last_name, form.value.identification_number, form.value.type, form.value.email, form.value.password).subscribe(
      data => {
        this.presentAlert('Exito', 'Usuario creado correctamente.');
        this.navCtrl.navigateForward('/users');
      },
      error => {
        this.presentAlert('Error', 'Error al hacer solicitud en la aplicación.');
      }
    );
  }

  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
    message: text,
    subHeader: title,
    buttons: ['OK']
   });
   await alert.present(); 
}

}
