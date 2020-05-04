import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email = '';
  pass = '';
  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private productService: ProductService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private alertService: AlertService) {
    this.menu.enable(true);
  }
  ngOnInit() {
    this.email = this.authService.token.email;
    this.pass = this.authService.token.password;
    if(this.email != null && this.pass != null){
      console.log(this.email, this.pass, 'Entro');
      this.authService.login(this.email, this.pass).subscribe(
        data => {
        },
        error => {
          console.log(error);
          this.presentAlert('Error', 'Imposible Iniciar sesión, verifique sus datos.');
        },
        () => {
          this.navCtrl.navigateRoot('/home');
        }
      );
    }
  }

  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
    message: text,
    subHeader: title,
    buttons: ['OK']
   });
   await alert.present(); 
  }

  ir_usuarios(){
    this.navCtrl.navigateRoot('/users');
  }

  ir_productos(){
    this.navCtrl.navigateForward('/products');
  }

  ir_inventario(){
    this.navCtrl.navigateForward('/inventories');
  }

  ir_cotizaciones(){
    this.navCtrl.navigateForward('/quotations');
  }

  ir_pedidos(){
    this.navCtrl.navigateForward('/orders');
  }


}
