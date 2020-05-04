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
  selector: 'app-inventory-quotation',
  templateUrl: './inventory-quotation.page.html',
  styleUrls: ['./inventory-quotation.page.scss'],
})
export class InventoryQuotationPage implements OnInit {
  UrlImagen = 'http://a1win.net/a1inv/storage/app/';
  textoBuscar = '';
  
  quantity: string;
  quotation_id:string;

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
    this.quotation_id = this.productService.id;
    //this.productService.edit_quotation(this.quotation_id);
    this.productService.getInventories();
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  buscar_inventario(product_id: string){
    this.productService.search_inventories(product_id);
    this.navCtrl.navigateRoot('/detail-inventories');
  }

  eliminar_item_cotizacion(quotation_id:string, product_id:string){
    this.productService.destroy_quotation(quotation_id, product_id);
    this.productService.edit_quotation(this.quotation_id);
  }

  eliminar_item_adicional(aditional_id:string){
    this.productService.destroy_aditional(aditional_id);
    this.productService.edit_quotation(this.quotation_id);
  }

  convertir_pedido(quotation_id:string){
    this.productService.getPay_Formats(quotation_id);
  }

  async showPrompt(product_id: string) {
    const prompt = await this.alertCtrl.create({
      message: "Ingrese cantidad a solicitar del producto en inventario",
      inputs: [
        {
          name: 'Cantidad',
          placeholder: 'Ejemplo: 20'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('Guardao', data);
            this.quantity = data["Cantidad"];
            console.log(this.quantity);
            var cant = parseInt(this.quantity);
            if(cant == 0){
              this.presentAlert('Error', 'No acepta el 0.');
            }
            else{
            this.productService.edit_quotation(this.quotation_id);
            this.productService.add_quotation(product_id, this.quantity);
            this.productService.edit_quotation(this.quotation_id);
            }
          }
        }
      ]
    });
   await prompt.present();
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
