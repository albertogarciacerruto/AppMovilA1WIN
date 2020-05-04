import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
//import { Observable, of, Subject } from 'rxjs';
//import 'rxjs/add/operator/map';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { connectListeners } from '@ionic/core/dist/types/utils/overlays';
import { AuthService } from './auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Variables Globales
  user = '';
  productos:any[] = [];
  colores:any[] = [];
  categorias:any[] = [];
  insumos:any[] = [];
  token:any;
  product_find:any[] = [];
  ubicaciones:any[] = [];
  inventarios:any[] = [];
  inventories_find:any[] = [];
  clientes:any[] = [];
  cotizaciones:any[] = [];
  quotation:any[] = [];

  date_aprox:any[] = [];
  quotation_id:any[] =[];
  user_id:any[] = [];
  product_id:any[] = [];
  name_product:any[] =[];
  faltante:any[] =[];

  date_finish:any[] = [];
  date_init:any[] = [];
  status:any[] = [];
  user_quo:any[] =[];
  user_quotation:any[]=[];
  inv_quo:any[] = [];
  aditionals:any[] = [];
  iva_quotation:string;
  total_quotation:string;
  quantity_quotation:string;
  iden_quotation:string;

  pagos:any[] =[];
  id_quotation:any[] = [];
  pedidos:any[] = [];
  order:any[] = [];
  order_id:any[]=[];
  diferencia:any[]=[];
  pagado:any[]=[];
  order_find:any[]=[];
  msj:any[]=[];
  payments:any[]=[];
  formats_payment:any[]=[];
  order_id_find:any;
  id:string;

  inventory_existence:any[] = [];
  supply_existence:any[]= [];
  supply_find:any[]=[];

  order_pdf:any[]=[];
  quotation_pdf:any[]=[];
  user_pdf:any[]=[];
  list_products_pdf:any[]=[];
  list_aditionals_pdf:any[]=[];
  list_payments_pdf:any[]=[];
  mensaje_pdf:string;

  min:string;
  max:string;

  //Rutas de API REST LARAVEL
  apiUrl_products = this.env.API_URL+'list';
  apiUrl_register = this.env.API_URL+'register_product';
  apiUrl_register_product = this.env.API_URL+'register_product';
  apiUrl_delete_product = this.env.API_URL + 'remove_product/';
  apiUrl_search_product = this.env.API_URL + 'search_product/';
  apiUrl_search_supply = this.env.API_URL + 'search_supply/';
  apiUrl_register_inventory = this.env.API_URL+'register_inventory';
  apiUrl_register_supply = this.env.API_URL + 'register_supply/';
  apiUrl_inventories = this.env.API_URL+'inventories';
  apiUrl_search_inventories = this.env.API_URL + 'search_inventories/';
  apiUrl_delete_inventory = this.env.API_URL + 'remove_inventory/';
  apiUrl_register_quotation = this.env.API_URL + 'register_quotation';
  apiUrl_register_quotation_2 = this.env.API_URL + 'register_quotation_2';//AQUI
  apiUrl_clients = this.env.API_URL + 'clients';
  apiUrl_quotations = this.env.API_URL + 'quotations/';
  apiUrl_delete_quotation = this.env.API_URL + 'remove_quotation/';
  apiUrl_edit_quotation = this.env.API_URL + 'edit_quotation/';
  apiUrl_add_quotation = this.env.API_URL + 'add_quotation/';
  apiUrl_confirmation_quotation = this.env.API_URL + 'confirmation_quotation/';
  apiUrl_cancelation_quotation = this.env.API_URL + 'cancelation_quotation/';
  apiUrl_destroy_quotation = this.env.API_URL + 'destroy_quotation/';
  apiUrl_destroy_aditional = this.env.API_URL + 'destroy_aditional/';
  apiUrl_pay_formats = this.env.API_URL + 'search_pay/';
  apiUrl_register_order = this.env.API_URL + 'register_order';
  apiUrl_orders = this.env.API_URL + 'orders/';
  apiUrl_devolution_order = this.env.API_URL + 'devolution/';
  apiUrl_search_order = this.env.API_URL + 'edit_order/';
  apiUrl_add_date = this.env.API_URL + 'add_date/';
  apiUrl_payments = this.env.API_URL + 'payments/';
  apiUrl_load_payments = this.env.API_URL + 'pay_insert/';
  apiUrl_delete_payment = this.env.API_URL + 'payment_delete/';
  apiUrl_inventory_existence = this.env.API_URL + 'inventory_sufficiency';
  apiUrl_supply_existence = this.env.API_URL + 'supply_sufficiency';
  apiUrl_register_payment = this.env.API_URL + 'register_payment/';

  apiUrl_data_pdf = this.env.API_URL + 'data_pdf/';//AQUI

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private authService: AuthService) {
    this.getRegister();
    this.getClients();
  }

  data_pdf(order_id: string){
    let url = this.apiUrl_data_pdf + order_id;
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
               this.quotation_pdf = data["quotation"];
               this.user_pdf = data["user"];
               this.list_products_pdf.push( ... data['list_quotations']);
               this.list_aditionals_pdf.push( ... data['list_aditionals']);
               this.list_payments_pdf.push( ... data['list_payments']);
               this.mensaje_pdf = data["msj"];
               this.navCtrl.navigateRoot('/');
             },
             error =>{
               console.log(error);
               this.presentAlert('Error', 'Imposible enocntrar la nota de entrega de la orden seleccionada.');
             });
  }


  //Método para encontrar colores, categorias e inusmos previos a un registro de productos.
  getRegister(){
    let url = this.apiUrl_register;
    this.http.get(url).pipe(map( resp => resp))
             .subscribe(data =>{
               this.colores =[];
               this.categorias =[];
               this.insumos =[];
               this.colores.push( ...data['colors']);
               this.categorias.push( ...data['categories']);
               this.insumos.push( ...data['supplies']);
             },
             error =>{
               console.error(error);
             })
  }

  //Método para encontrar todos los productos en el sistema.
  getProducts(){
    let url = this.apiUrl_products;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              console.log(data)
              this.productos = [];
              this.productos.push( ... data['products']);
             },
             error =>{
               console.error(error);
             })
  }

  //Método para registrar productos en el sistema.
  register_product(name: String, description: String, size: String, amount: Number, color_id: Number, category_id: Number, supply_id: Number, quantity: Number, user_id: String, image: String) {
        return this.http.post(this.apiUrl_register_product,
      {name: name, description: description, size: size, amount: amount, color_id: color_id, category_id: category_id, supply_id: supply_id, quantity: quantity, user_id: user_id, image: image})
  }

  //Método para eliminar productos del sistema.
  delete_product(product_id:string) {
    console.log(this.apiUrl_delete_product + product_id);
    return this.http.get(this.apiUrl_delete_product + product_id);
  }

  //Método para encontrar ubicacioones e información de un producto en particular previo abastecer el inventario.
  search_product(product_id: string){
    let url = this.apiUrl_search_product + product_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
               this.product_find = [];
               this.ubicaciones = [];
               this.product_find = data['products'];
               this.ubicaciones.push( ...data['locations']);
             },
             error =>{
               console.log(error);
              this.presentAlert('Error', 'Imposible enocntrar el detalle del producto seleccionado.');
             });
  }

  //Método para encontrar el insumo con poca existencia en el sistema.
  search_supply(supply_id: string){
    let url = this.apiUrl_search_supply + supply_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
               this.supply_find = [];
               this.supply_find = data['supplies'];
             },
             error =>{
               console.log(error);
              this.presentAlert('Error', 'Imposible enocntrar el detalle del producto seleccionado.');
             });
  }
  
  //Método genérico y asíncrono para imprimir PopUp en la App.
  async presentAlert(title, text) {
    const alert = await this.alertCtrl.create({
    message: text,
    subHeader: title,
    buttons: ['OK']
   });
   await alert.present(); 
  }

  //Método para registrar elementos al inventario de productos finales.
  register_inventory(quantity: String, location_id: string, user: string, product_id: String) {
    this.http.post(this.apiUrl_register_inventory,
  {quantity: quantity, location_id: location_id, user: user, product_id: product_id}).pipe(map(resp => resp)).subscribe(
    data => {
      if(data["mensaje"] == 'si'){
        this.presentAlert('Exito', 'Producto incorporado en inventario correctamente.');
        this.getProducts();
        this.navCtrl.navigateRoot('/products');
      }
      else if(data["mensaje"] == 'no') {
        console.log(data);
        this.presentAlert('Error', 'Imposible incoporar producto en inventario, falta existencia de materia prima.');
      }
    },
    error => {
      console.log(error);
     this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
    }
  );
}

//Método para registrar metros en un insumo en particular con baja existencia en la App.
register_supply(meters: String, supply_id: String, user: string) {
  this.http.post(this.apiUrl_register_supply + supply_id + '/' + user,
{meters: meters, user: user, supply_id: supply_id}).pipe(map(resp => resp)).subscribe(
  data => {
    this.presentAlert('Exito', 'Insumo incorporado en inventario correctamente.');
    this.navCtrl.navigateRoot('/supply-existence');
  },
  error => {
   console.log(error);
   this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
  }
);
}

//Método que obtiene el inventario de productos finales.
getInventories(){
  let url = this.apiUrl_inventories;
  this.http.get(url).pipe(map(resp => resp))
           .subscribe(data =>{
            this.inventarios = [];
            this.inventarios.push( ... data['inventories']);
           },
           error =>{
             console.error(error);
           })
}

//Método para encontrar información relacionada a un inventario del sistema.
search_inventories(product_id: string){
  let url = this.apiUrl_search_inventories + product_id;
  this.http.get(url).pipe(map(resp => resp))
           .subscribe(data =>{
             this.inventories_find = [];
             this.inventories_find = data['inventories'];
           },
           error =>{
             console.log(error);
            this.presentAlert('Error', 'Imposible enocntrar el detalle del producto seleccionado.');
           });
}

//Método para eleiminar reistro de inventario.
delete_inventory(inventory_id:string, product_id: string, user: string) {
  let url = this.apiUrl_delete_inventory +inventory_id + '/' +product_id + '/' + user;
  this.http.get(url).pipe(map(resp => resp))
          .subscribe( data => {
            this.presentAlert('Exito', data["mensaje"]);
            this.navCtrl.navigateRoot('/inventories');
          },
          error => {
            console.log(error);
            this.presentAlert('Error', 'Imposible completar solicitud');
          });
}

//Método que encuentra todos los clientes para hacer una cotización.
getClients(){
  let url = this.apiUrl_clients;
  this.http.get(url).pipe(map(resp => resp))
           .subscribe(data =>{
            this.clientes = [];
            this.clientes.push( ... data['clients']);
            this.min = data['min'];
            this.max = data['max'];
            console.log(this.min);
           },
           error =>{
             console.error(error);
           })
}

//Método para registrar una cotización en el sistema.
register_quotation(date_init: String, user_id: string, user: string) {
  return this.http.post(this.apiUrl_register_quotation,
{date_init: date_init, user_id: user_id, user: user}).pipe(map(resp => resp)).subscribe(
    data => {
      if(data["mensaje"] == 'Ya realizo una solicitud de cotización para este dia'){
        this.presentAlert('Error', 'Imposible realizar solictud, ya tiene una cotizacion registrada para dicha fecha.');
      }
      else {
        this.presentAlert('Exito', 'Solicitud realizada correctamente.');
        this.navCtrl.navigateRoot('/quotations');
      }
    },
    error => {
      console.log(error);
    this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
    }
  );
  }

  register_quotation_2(user_id: string, user: string) {
    return this.http.post(this.apiUrl_register_quotation_2,
  {user_id: user_id, user: user}).pipe(map(resp => resp)).subscribe(
      data => {
        if(data["mensaje"] == 'Ya realizo una solicitud de cotización para este dia'){
          this.presentAlert('Error', 'Imposible realizar solictud, ya tiene una cotizacion registrada para dicha fecha.');
        }
        else if(data["mensaje"] == 'Usuario bloqueado'){
          this.presentAlert('Bloqueo', 'Usuario bloqueado, comuniquese con los administradores.');
          this.navCtrl.back();
        }
        else {
          this.presentAlert('Exito', 'Solicitud realizada correctamente.');
          this.navCtrl.navigateRoot('/quotations');
        }
      },
      error => {
        console.log(error);
      //this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
      this.presentAlert('Error', 'Imposible realizar solictud, ya tiene una cotizacion registrada para dicha fecha.');
      this.navCtrl.back();
    }
    );
    }

  //Método para obtener todas las cotizacion por confirmar del sistema.
  getQuotations(){
    this.user = JSON.stringify(this.authService.token.id_user);
    console.log(this.user);
    let url = this.apiUrl_quotations + this.user;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              this.cotizaciones = [];
              this.cotizaciones.push( ... data['quotations']);
             },
             error =>{
               console.error(error);
             })
  }

  //Método para pasar Id de la cotización a pantalla de Inventory-Quotation para refrescar la misma.
  get_id(quotation_id: string){
    this.id = '';
    this.id = quotation_id;
  }

  //Método para eliminar una cotización.
  delete_quotation(quotation_id:string) {
    return this.http.get(this.apiUrl_delete_quotation + quotation_id);
  }

  //Método para editar una cotización en particular.
  edit_quotation(quotation_id:string) {
    let url = this.apiUrl_edit_quotation + quotation_id;
    console.log(quotation_id);
    this.http.get(url).pipe(map(resp => resp))
            .subscribe(data =>{
              this.quotation = [];
              this.quotation = data['quotation'];
              this.user_quo = [];
              this.user_quo = data["user"];
              //Para acbecera de inventory-quotation
              this.date_init = [];
              this.date_init = this.quotation["date_init"];
              this.date_finish = [];
              this.date_finish = this.quotation["date_finish"];
              this.status = [];
              this.status = this.quotation["status"];
              //Para obtener usuario de la cotizacion en inventory_quotation
              this.user_quotation = [];
              this.user_quotation = this.user_quo["name"];
              //Para obtener todos los productos en inventory_quotation
              this.inv_quo = [];
              this.inv_quo.push( ... data['inventory_quotation']);
              //para obtener todos los adicionales en inventory_quotation
              this.aditionals = [];
              this.aditionals.push( ... data['aditionals']);
              //Para totales
              this.iva_quotation = '';
              this.iva_quotation = this.quotation["iva"];
              this.total_quotation = '';
              this.total_quotation = this.quotation["total"];
              this.quantity_quotation = '';
              this.quantity_quotation = this.quotation["quantity"];
              this.iden_quotation = '';
              this.iden_quotation = this.quotation["id"];
              this.getInventories();
            },
            error =>{
              console.log(error);
              this.presentAlert('Error', 'Imposible enocntrar el detalle del producto seleccionado.');
            });

  }

  //Método para añadir nuevos elementos a una cotización.
  add_quotation(product_id: string, quantity: string) {
    let quotation_id = this.quotation["id"];
    let user = this.user;
    let url = this.apiUrl_add_quotation + product_id + '/' + quantity + '/' + quotation_id + '/' + user;
    this.http.get(url).pipe(map(resp => resp))
            .subscribe(data =>{
              if(data["mensaje"] == 'adicional'){
                this.date_aprox = [];
                this.quotation_id = [];
                this.user_id = [];
                this.product_id = [];
                this.faltante = [];
                this.date_aprox = data["date_aprox"];
                this.quotation_id = data["quotation_id"];
                this.user_id = data["user"];
                this.product_id = data["product_id"];
                this.faltante = data["faltante"];
                this.navCtrl.navigateRoot('/confirmation-quotation');
              }else{
              this.presentAlert('Agregado', 'Solicitud cargada con exito.');
              }
            },
            error =>{
              console.log(error);
              this.presentAlert('Error', 'Imposible procesar solicitud.');
            });

  }

  //Método que permite confirmar elementos adicionales cuando no hay existencia.
  confirmation_next(quotation_id, date_aprox, product_id, faltante){
    let user = this.user;
    let url = this.apiUrl_confirmation_quotation + quotation_id + '/' + date_aprox + '/' + product_id + '/' + faltante + '/' + user;
    this.http.get(url).pipe(map(resp => resp))
    .subscribe(data =>{
      this.presentAlert('Agregado', 'Solicitud de productos adicionales cargada con exito.');
      this.edit_quotation(quotation_id);
      this.navCtrl.navigateRoot('/inventory-quotation');
    },
    error =>{
      console.log(error);
      this.presentAlert('Error', 'Imposible procesar solicitud.');
    });
  }

  //Método que permite cancelar los adicionales de una cotización.
  cancelation_next(quotation_id, product_id){
    let user = this.user;
    let url = this.apiUrl_cancelation_quotation + quotation_id + '/' +  product_id + '/' + user;
    this.http.get(url).pipe(map(resp => resp))
    .subscribe(data =>{
      this.presentAlert('Exito', 'Solicitud cancelada correctamente.');
      this.edit_quotation(quotation_id);
      this.navCtrl.back();
    },
    error =>{
      console.log(error);
      this.presentAlert('Error', 'Imposible procesar solicitud.');
    });
  }

  //Método que permite eliminar elementos de una cotización.
  destroy_quotation(quotation_id: string, inventory_id:string){
    let user = this.user;
    let url = this.apiUrl_destroy_quotation + quotation_id + '/' + inventory_id + '/' + user;
    this.http.get(url).pipe(map(resp => resp))
    .subscribe(data =>{
      this.presentAlert('Exito', 'Elemento eliminado correctamente.');
      this.getInventories();// AQUI
      this.edit_quotation(quotation_id);// AQUI
      this.navCtrl.navigateRoot('/inventory-quotation');
    },
    error =>{
      console.log(error);
      this.presentAlert('Error', 'Imposible procesar solicitud.');
    });
  }

  //Método que permite eliminar elementos adicionales de una cotización.
  destroy_aditional(aditional_id:string){
    let user = this.user;
    let url = this.apiUrl_destroy_aditional + aditional_id + '/' + user;
    this.http.get(url).pipe(map(resp => resp))
    .subscribe(data =>{
      this.presentAlert('Exito', 'Elemento eliminado correctamente.');
      this.getInventories();// AQUI
      this.navCtrl.navigateRoot('/inventory-quotation');
    },
    error =>{
      console.log(error);
      this.presentAlert('Error', 'Imposible procesar solicitud.');
    });
  }

  //Métodos para obtener formas de pago disponibles en el sistema.
  getPay_Formats(quotation_id:string){
    let url = this.apiUrl_pay_formats + quotation_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
              this.pagos = [];
              this.id_quotation = [];
              this.pagos.push( ... data['pay_formats']);
              this.id_quotation = data['quotation'];
              this.navCtrl.navigateRoot('/register-order');
             },
             error =>{
               console.error(error);
             })
  }

  //Métofo para registrar pedidos en el sistema.
  register_order(bank: String, confirmation: string, pay_format: string, amount: String, description: String, user: string, quotation_id: String) {
    this.http.post(this.apiUrl_register_order,
  {bank: bank, confirmation: confirmation, pay_format: pay_format, amount: amount, description: description, user: user, quotation_id: quotation_id}).pipe(map(resp => resp)).subscribe(
    data => {
        this.presentAlert('Exito', 'Pago incorporado en inventario correctamente.');
        this.navCtrl.navigateRoot('/quotations');
    },
    error => {
      console.log(error);
      this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
    }
  );
}

  //Método para obtener todas lar ordenes registradas en el sistema.
  getOrders(){
    this.user = JSON.stringify(this.authService.token.id_user);
    let url = this.apiUrl_orders + this.user;
    this.http.get(url).pipe(map(resp => resp))
            .subscribe(data =>{
              this.pedidos = [];
              this.pedidos.push( ... data['orders']);
              console.log(this.pedidos);
            },
            error =>{
              console.error(error);
            })
  }

  //Método para devolver una orden o pedido.
  devolution_order(order_id:string){
    let user = this.user;
    let url = this.apiUrl_devolution_order + order_id + '/' + user;
    this.http.get(url).pipe(map(resp => resp))
    .subscribe(data =>{
      this.presentAlert('Exito', 'Pedido devuelto coon exito.');
      this.getOrders();
      this.navCtrl.navigateRoot('/orders');
    },
    error =>{
      console.log(error);
      this.presentAlert('Error', 'Imposible procesar solicitud.');
    });
  }

  //Método para obtener información de una orden en particular.
  search_order(order_id: string){
    let url = this.apiUrl_search_order + order_id;
    this.http.get(url).pipe(map(resp => resp))
             .subscribe(data =>{
               this.order = [];
               this.inv_quo = [];
               this.aditionals = [];
               this.order = data["order"];
               //Para obtener todos los productos en inventory_quotation
               this.inv_quo.push( ... data['inventory_quotation']);
               //para obtener todos los adicionales en inventory_quotation
               this.aditionals.push( ... data['aditionals']);
               this.navCtrl.navigateRoot('/detail-order');
             },
             error =>{
               console.log(error);
               this.presentAlert('Error', 'Imposible enocntrar el detalle del producto seleccionado.');
             });
  }

  //Método para devolver pedido en el sistema.
  add_date(date_final: String, order_id: string) {
    let user = this.user;
    this.http.post(this.apiUrl_add_date + user + '/' + order_id,
  {date_final: date_final}).pipe(map(resp => resp)).subscribe(
    data => {
      this.presentAlert('Exito', 'Pedido devuelto coon exito.');
      this.navCtrl.navigateRoot('/orders');
    },
    error => {
      console.log(error);
      this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
    });
  }

  //Método para obtener los productos con baja existencia en el sistema.
  get_inventory_existence(){
    let url = this.apiUrl_inventory_existence;
    this.http.get(url).pipe(map(resp => resp))
            .subscribe(data =>{
              this.inventory_existence = [];
              this.inventory_existence.push( ... data['list_inventories']);
            },
            error =>{
              console.error(error);
            })
  }

  //Método para obtener todos los isnumos con baja existencia en el sistema.
  get_supply_existence(){
    let url = this.apiUrl_supply_existence;
    this.http.get(url).pipe(map(resp => resp))
            .subscribe(data =>{
              this.supply_existence = [];
              this.supply_existence.push( ... data['list_supplies']);
            },
            error =>{
              console.error(error);
            })
  }

  //Método para obtener las formas de pago habilitadas en la app e información de una orden en particular para registrar nuevos pagos.
  get_payment(order_id:string){
    let url = this.apiUrl_payments + order_id;
    this.http.get(url).pipe(map(resp=>resp))
             .subscribe( data => {
               this.order_id = [];
               this.diferencia =[];
               this.pagado = [];
               this.order_find = [];
               this.msj = [];
               this.payments = [];
               this.order_id = data['order'];
               this.diferencia = data['diferencia'];
               this.pagado = data['pagado'];
               this. order_find = data['orden'];
               this.msj = data['msj'];
               this.payments.push( ... data['list_payments']);
             },
             error => {
              console.log(error);
             });
  }

  //Método para obtener todos los pagos de una orden.
  get_pay(order_id:string){
    let url = this.apiUrl_load_payments + order_id;
    this.http.get(url).pipe(map(resp=>resp))
              .subscribe( data=>{
                this.formats_payment = [];
                this.formats_payment.push( ... data['list_payments']);
                this.order_id_find = order_id;
              },
              error => {
                console.log(error);
              });
  }

  //Método para registrar un nuevo pago a un pedido.
  register_payment(bank: String, confirmation: string, pay_format: string, amount: String, description: String, user: string, order_id: String) {
    this.http.post(this.apiUrl_register_payment + order_id + '/' + user,
  {bank: bank, confirmation: confirmation, pay_format: pay_format, amount: amount, description: description}).pipe(map(resp => resp)).subscribe(
    data => {
      if(data['mensaje'] == 'El monto es mayor al total establecido.'){
        this.presentAlert('Alerta', data['mensaje']);
        this.navCtrl.navigateRoot('/orders');
      }else{
        this.presentAlert('Exito', 'Pago incorporado en inventario correctamente.');
        this.navCtrl.navigateRoot('/orders');
      }   
    },
    error => {
      console.log(error);
      this.presentAlert('Error', 'Imposible ejecutar accion en la aplicacion.');
    }
  );
}

//Método para eliminar un pago de una orden en particular en el sistema.
delete_payment(payment_id:string){
  let url = this.apiUrl_delete_payment + payment_id;
  this.http.get(url).pipe(map(resp=>resp))
           .subscribe(data => {
            this.presentAlert('Exito', data['mensaje']);
            this.navCtrl.navigateRoot('/orders');
           }, 
           error =>{
             console.log(error);
             this.presentAlert('Error', 'No se puede ejecutar la accion en la aplicacion.')

           });
 }

}
