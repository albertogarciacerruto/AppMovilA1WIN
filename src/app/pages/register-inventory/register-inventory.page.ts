import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Inventory } from 'src/app/models/inventory';
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
  selector: 'app-register-inventory',
  templateUrl: './register-inventory.page.html',
  styleUrls: ['./register-inventory.page.scss'],
})
export class RegisterInventoryPage implements OnInit {

  inventory: Inventory = {
    id: '',
    quantity: '',
    batch_id: '',
    location_id: '',
    product_id: '',
    status: '',
    user: ''
    };

    user: string;

  producto:any;

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
 

  register_inventory(form: NgForm, product_id: string) {
    console.log('hay', form.value.quantity, form.value.location_id, this.user, product_id);
    if(form.value.quantity <= 0){
      this.presentAlert('Error', 'No acepta el 0.');
      this.navCtrl.back();
    }else{
    this.productService.register_inventory(form.value.quantity, form.value.location_id, this.user, product_id);
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
