import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-detail-inventories',
  templateUrl: './detail-inventories.page.html',
  styleUrls: ['./detail-inventories.page.scss'],
})
export class DetailInventoriesPage implements OnInit {

  UrlImagen = 'http://a1win.net/a1inv/storage/app/';
  textoBuscar = '';
  user = '';
  type:string;
  constructor(private menu: MenuController,
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
    this.user = JSON.stringify(this.authService.token.id_user);
    this.type = JSON.stringify(this.authService.token.user_type);
  }

  
  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  borrar_inventario(inventory_id: string, product_id: string, user: string){
    this.productService.delete_inventory(inventory_id, product_id, this.user);
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
