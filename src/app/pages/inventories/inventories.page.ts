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
  selector: 'app-inventories',
  templateUrl: './inventories.page.html',
  styleUrls: ['./inventories.page.scss'],
})
export class InventoriesPage implements OnInit {
  UrlImagen = 'http://a1win.net/a1inv/storage/app/';
  textoBuscar = '';
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
    this.productService.getInventories();
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  buscar_inventario(product_id: string){
    this.type = JSON.stringify(this.authService.token.user_type);
    this.productService.search_inventories(product_id);
    this.navCtrl.navigateRoot('/detail-inventories');
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
