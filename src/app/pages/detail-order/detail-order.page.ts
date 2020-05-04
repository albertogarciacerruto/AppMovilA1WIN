import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { MenuController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
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
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {

  order: Order = {
    order_id: '',
    date_final: '',
    user: ''
    };

    user: string;
    date_init : any;

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
    this.date_init = this.productService.date_init;
    console.log(this.date_init);
  }

  agregar_fecha(form: NgForm, order_id:string) {
    //console.log('hay', form.value.quantity, form.value.location_id, this.user, form.value.product_id);
    this.productService.add_date(form.value.date_final, order_id);
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
