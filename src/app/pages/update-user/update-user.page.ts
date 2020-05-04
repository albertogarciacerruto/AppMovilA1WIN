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
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  user: User = {
    id: '',
    name: '',
    last_name: '',
    identification_number: '',
    type: '',
    email: '',
    password: ''
  };


  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private userService: UserService,
    private authService: AuthService,
    public alertCtrl: AlertController,
    private navCtrl: NavController) {
    this.menu.enable(true);
    }


  ngOnInit() {
    this.user.id = this.userService.user_find["id"];
    this.user.name = this.userService.user_find["name"];
    this.user.last_name = this.userService.user_find["lastname"];
    this.user.identification_number = this.userService.user_find["identification_number"];
    this.user.type = this.userService.user_find["type"];
    this.user.email = this.userService.user_find["email"];
  }


  update_user(form: NgForm, user_id:string) {
    this.userService.update_user(form.value.name, form.value.last_name, form.value.identification_number, form.value.type, form.value.email, user_id, form.value.password).subscribe(
      data => {
        this.presentAlert('Exito', 'Usuario actualizado correctamente.');
        this.userService.getUsers();
        this.navCtrl.navigateRoot('/users');
      },
      error => {
        console.log(error);
        this.presentAlert('Error', 'Imposible completar la solicitud en la aplicación.');
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
