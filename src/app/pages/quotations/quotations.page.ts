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
  selector: 'app-quotations',
  templateUrl: './quotations.page.html',
  styleUrls: ['./quotations.page.scss'],
})
export class QuotationsPage implements OnInit {
  user = '';
  textoBuscar = '';
  type:string;
  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private productService: ProductService,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) {
  	this.menu.enable(true);
  }

  ngOnInit() {
    this.user = JSON.stringify(this.authService.token.id_user);
    this.type = JSON.stringify(this.authService.token.user_type);
    console.log(this.user);
    this.productService.getQuotations();
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  borrar_cotizacion(quotation_id: string){
    this.productService.delete_quotation(quotation_id).subscribe( data => {
      this.presentAlert('Exito', data["mensaje"]);
      this.productService.getQuotations();
      this.navCtrl.navigateRoot('/quotations');
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

editar_cotizacion(quotation_id: string){
  this.productService.get_id(quotation_id);
  this.productService.edit_quotation(quotation_id);
  this.navCtrl.navigateRoot('/inventory-quotation');
}


}
