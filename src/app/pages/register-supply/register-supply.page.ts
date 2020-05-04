import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Supply } from 'src/app/models/supply';
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
  selector: 'app-register-supply',
  templateUrl: './register-supply.page.html',
  styleUrls: ['./register-supply.page.scss'],
})
export class RegisterSupplyPage implements OnInit {

  supply: Supply = {
    id: '',
    meters: '',
    user: ''
    };

  user: string;

  insumo:any;

  constructor(private menu: MenuController,
              private http: HttpClient,
              private env: EnvService,
              private storage: Storage,
              private productService: ProductService,
              private authService: AuthService,
              public alertCtrl: AlertController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.user = JSON.stringify(this.authService.token.id_user);
  }

  register_supply(form: NgForm, supply_id: string) {
    console.log('hay', form.value.meters, this.user, supply_id);
    if(form.value.meters == 0){
      this.presentAlert('Error', 'No acepta el 0.');
      this.navCtrl.back();
    }
    else{
    this.productService.register_supply(form.value.meters, this.user, supply_id);
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

}
