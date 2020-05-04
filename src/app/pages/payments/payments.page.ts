import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';

import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  type:string;
  
  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private productService: ProductService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService) {
  	this.menu.enable(true);
  }


  ngOnInit() {

  }

  convertir_pedido(order_id:string){
    this.type = JSON.stringify(this.authService.token.user_type);
    this.productService.get_pay(order_id);
    this.navCtrl.navigateRoot('/register-payments');
  }

  eliminar(payment_id:string){
    this.productService.delete_payment(payment_id);
  }

}
