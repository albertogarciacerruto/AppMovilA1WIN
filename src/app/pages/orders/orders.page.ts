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

import { Platform } from '@ionic/angular';
import { tap, map } from 'rxjs/operators';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  object: any;
  flag:string;
  order_pdf:any[]=[];
  quotation_pdf:any[]=[];
  user_pdf:any[]=[];
  list_products_pdf:any[]=[];
  list_aditionals_pdf:any[]=[];
  list_payments_pdf:any[]=[];
  mensaje_pdf:string;

  user = '';
  textoBuscar = '';

  apiUrl_pdf = this.env.API_URL+'data_pdf/';
  
  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private productService: ProductService,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public file: File,
    public platform: Platform,
    public fileOpener: FileOpener,
    public loadingController: LoadingController) {
  	this.menu.enable(true);
  }

  ngOnInit() {
    this.user = JSON.stringify(this.authService.token.id_user);
    console.log(this.user);
    this.productService.getOrders();
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  insertar_fecha(order_id){
    console.log(order_id, 'ORDER ID');
    this.productService.search_order(order_id);
  }

  ver_nota(order_id){
    console.log(order_id, 'ORDER ID');
    this.productService.data_pdf(order_id);
  }

  devolver_pedido(order_id: string){
    this.productService.devolution_order(order_id);
    
  }

  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
    message: text,
    subHeader: title,
    buttons: ['OK']
   });
   await alert.present(); 
}

  agregar_fecha(order_id: string){
  //this.productService.edit_quotation(quotation_id);
  this.navCtrl.navigateRoot('/inventory-quotation');
}

buscar_pagos(order_id: string){
  this.productService.get_payment(order_id);
  this.navCtrl.navigateRoot('/payments');
}

generatePDF(order_id:string){
  let url = this.apiUrl_pdf + order_id;
  this.http.get(url).pipe(map(resp => resp))
           .subscribe(data =>{
             this.order_pdf = [];
             this.quotation_pdf = [];
             this.user_pdf = [];
             this.list_products_pdf = [];
             this.list_aditionals_pdf = [];
             this.list_payments_pdf = [];
             this.mensaje_pdf = '';

             this.order_pdf = data["order"];
             console.log('order_pdf', this.order_pdf);
             this.quotation_pdf = data["quotation"];
             this.user_pdf = data["user"];
             this.list_products_pdf.push( ... data["list_quotations"]);

             this.list_aditionals_pdf.push( ... data["list_aditionals"]);
             this.list_payments_pdf.push( ... data["list_payments"]);
             this.mensaje_pdf = data["msj"];


             var rows = [];
             rows.push([{text: 'N° Confirmación', bold: true, color: '#264252', alignment: 'center' }, {text: 'Banco', bold: true, color: '#264252', alignment: 'center'}, {text: 'Monto', bold: true, color: '#264252', alignment: 'center'},{text: 'Fecha', bold: true, color: '#264252', alignment: 'center'}])
             for(let variable of this.list_payments_pdf) {
                rows.push([{text: variable["confirmation"], bold: true, color: 'black', alignment: 'center'}, {text: variable["bank"], bold: true, color: 'black', alignment: 'center'}, {text: 'Bs. ' + variable["amount"], bold: true, color: 'black', alignment: 'center'}, {text: variable["date"], bold: true, color: 'black', alignment: 'center'}])
             }

            var products = [];
            products.push([{text: 'Producto', bold: true, color: '#264252', alignment: 'center' }, {text: 'Talla', bold: true, color: '#264252', alignment: 'center'}, {text: 'Cantidad', bold: true, color: '#264252', alignment: 'center'},{text: 'Precio', bold: true, color: '#264252', alignment: 'center'}])
            for(let datos of this.list_products_pdf) {
               products.push([{text: datos["name"], bold: true, color: 'black', alignment: 'center'}, {text: datos["size"], bold: true, color: 'black', alignment: 'center'}, {text: datos["volume"], bold: true, color: 'black', alignment: 'center'}, {text: 'Bs. ' + datos["amount"] + ' c/u', bold: true, color: 'black', alignment: 'center'}])
             }

             var aditionals = [];
             aditionals.push([{text: 'Producto', bold: true, color: '#264252', alignment: 'center' }, {text: 'Talla', bold: true, color: '#264252', alignment: 'center'}, {text: 'Cantidad', bold: true, color: '#264252', alignment: 'center'},{text: 'Precio', bold: true, color: '#264252', alignment: 'center'}])
             for(let item of this.list_aditionals_pdf) {
                aditionals.push([{text: item["name"], bold: true, color: 'black', alignment: 'center'}, {text: item["size"], bold: true, color: 'black', alignment: 'center'}, {text: item["quantity"], bold: true, color: 'black', alignment: 'center'}, {text: 'Bs. ' + item["amount"] + ' c/u', bold: true, color: 'black', alignment: 'center'}])
              }

             let docDefinition = {
               content: [
            {qr: JSON.stringify(this.order_pdf["id"]) , alignment: 'center' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'Nota de Entrega', bold: true, color: 'black', alignment: 'center' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'A1WIN - Caracas - Falcón', bold: false, italic: true,  color: 'black', alignment: 'center' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'Datos del Pedido:', bold: true, color: 'black' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {
              style: 'tableExample',
              table: {
                alignment: 'center',
                widths: [145, 200, 145],
                body: [
                  [{text: 'Fecha Expedición', bold: true, color: '#264252', alignment: 'center' }, {text: 'Fecha Entrega', bold: true, color: '#264252', alignment: 'center'}, {text: 'Cliente', bold: true, color: '#264252', alignment: 'center'}],
                  [{text: this.order_pdf["date_init"], bold: true, color: 'black', alignment: 'center'}, {text: this.order_pdf["date_final"], bold: true, color: 'black', alignment: 'center'}, {text: this.user_pdf["name"], bold: true, color: 'black', alignment: 'center'}],
                  [{text: 'Cédula/RIF', bold: true, color: '#264252', alignment: 'center'}, {text: 'Correo Electrónico', bold: true, color: '#264252', alignment: 'center'}, {text: 'Estatus', bold: true, color: '#264252', alignment: 'center'}],
                  [{text: this.user_pdf["identification_number"], bold: true, color: 'black', alignment: 'center'}, {text: this.user_pdf["email"], bold: true, color: 'black', alignment: 'center'}, {text: this.mensaje_pdf, bold: true, color: 'black', alignment: 'center'}],
                ]
              }
            },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'Pagos Realizados:', bold: true, color: 'black' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {
              style: 'tableExample',
              table: {
                alignment: 'center',
                widths: [120, 120, 120, 120],
                body: rows
              }
            },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'Productos Solicitados:', bold: true, color: 'black' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {
              style: 'tableExample',
              table: {
                alignment: 'center',
                widths: [120, 120, 120, 120],
                body: products
              }
            },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'Productos Soliciatdos Pendientes:', bold: true, color: 'black' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {
              style: 'tableExample',
              table: {
                alignment: 'center',
                widths: [120, 120, 120, 120],
                body: aditionals
              }
            },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: 'Totales:', bold: true, color: 'black' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {
              style: 'tableExample',
              table: {
                alignment: 'center',
                widths: [163, 163, 163],
                body: [
                  [{text: 'N° Productos', bold: true, color: '#264252', alignment: 'center' }, {text: 'I.V.A.', bold: true, color: '#264252', alignment: 'center'}, {text: 'Total', bold: true, color: '#264252', alignment: 'center'}],
                  [{text: this.order_pdf["num_product"], bold: true, color: 'black', alignment: 'center'}, {text: 'Bs. ' + this.order_pdf["iva"], bold: true, color: 'black', alignment: 'center'}, {text: 'Bs. ' + this.order_pdf["total"], bold: true, color: 'black', alignment: 'center'}],
                ]
              }
            },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            {text: ' ', bold: true, color: 'black', alignment: 'center' },
            { text: 'Nota de entrega valida para cualquier reclamo e inconveniente. A1WIN@2019', alignment: 'center', color: '#264252'},
           ]};

           this.object = pdfMake.createPdf(docDefinition);
           this.openPDF();
           },
           error =>{
             console.log(error);
             alert('Imposible enocntrar la nota de entrega de la orden seleccionada.');
           });
          
           
           
}

openPDF(){
  this.presentLoading();
  if(this.platform.is('cordova')){
    this.object.getBuffer((buffer)=> {
      var blob = new Blob([buffer], {type: 'application/pdf'});
      this.file.writeFile(this.file.dataDirectory, 'NotaEntrega.pdf', blob, {replace: true}).then(fileEntry =>{
        this.fileOpener.open(this.file.dataDirectory + 'NotaEntrega.pdf', 'application/pdf');
      });
    });
    return true;
  }
  this.object.download();
}

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Por Favor Espere...',
    duration: 3000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();

  console.log('Loading dismissed!');
}

}
