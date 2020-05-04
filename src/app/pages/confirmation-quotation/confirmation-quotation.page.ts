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
  selector: 'app-confirmation-quotation',
  templateUrl: './confirmation-quotation.page.html',
  styleUrls: ['./confirmation-quotation.page.scss'],
})
export class ConfirmationQuotationPage implements OnInit {

  UrlImagen = 'http://localhost/A1WINventario/storage/app/';
  textoBuscar = '';

  name: string;
  image: string;
  faltante: string;
  product_id: string;
  quotation_id: string;

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
    this.name = this.productService.product_id["name"];
    this.image = this.productService.product_id['image'];
    this.faltante = JSON.stringify(this.productService.faltante);
    this.productService.date_aprox;
    this.product_id = this.productService.product_id["id"];
    this.quotation_id = this.productService.quotation_id["id"];
  }

  aceptar(quotation_id: string, date_aprox: string, product_id: string, faltante: string ){
    this.productService.confirmation_next(quotation_id, date_aprox, product_id, faltante);
    
  }

  rechazar(quotation_id: string, product_id: string){
    this.productService.cancelation_next(quotation_id, product_id);
    
  }
  

}
