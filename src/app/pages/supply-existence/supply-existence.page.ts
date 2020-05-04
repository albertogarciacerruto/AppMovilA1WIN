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

@Component({
  selector: 'app-supply-existence',
  templateUrl: './supply-existence.page.html',
  styleUrls: ['./supply-existence.page.scss'],
})
export class SupplyExistencePage implements OnInit {

  UrlImagen = 'http://a1win.net/a1inv/storage/app/';
  textoBuscar = '';

  constructor(private menu: MenuController,
              private http: HttpClient,
              private env: EnvService,
              private storage: Storage,
              private productService: ProductService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {
              this.menu.enable(true);
              }

  ngOnInit() {
    this.productService.get_supply_existence();
  }

  inventory(){
    this.productService.get_inventory_existence();
    this.navCtrl.navigateRoot('/inventory-existence');
  }

  supply(){
    this.productService.get_supply_existence();
    this.ngOnInit();
  }

  buscar_insumo(supply_id:string){
    this.productService.search_supply(supply_id);
    this.navCtrl.navigateRoot('/register-supply');
  }

}
