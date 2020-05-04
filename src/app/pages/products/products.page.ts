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
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  UrlImagen = 'http://a1win.net/a1inv/storage/app/';
  textoBuscar = '';
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
    this.type = JSON.stringify(this.authService.token.user_type);
    this.productService.getProducts();
    this.refreshPage();
  }
  refreshPage(){
    this.productService.getProducts();
  }


  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  buscar_producto(product_id: string){
    this.productService.search_product(product_id);
    this.navCtrl.navigateRoot('/register-inventory');
    

  }

  borrar_producto(product_id: string){
    this.productService.delete_product(product_id).subscribe( data => {
      this.presentAlert('Exito', data["mensaje"]);
      this.productService.getProducts();
      this.ngOnInit();
    },
    error => {
      this.presentAlert('Error', 'Imposible completar solicitud');
    });
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
