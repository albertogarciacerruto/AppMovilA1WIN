import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { MenuController } from '@ionic/angular';
import { Quotation } from 'src/app/models/quotation';
import { Inventory } from 'src/app/models/inventory';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register-quotation',
  templateUrl: './register-quotation.page.html',
  styleUrls: ['./register-quotation.page.scss'],
})
export class RegisterQuotationPage implements OnInit {

  quotation: Quotation = {
    id: '',
    date_init: '',
    date_finish: '',
    quantity: '',
    iva: '',
    total: '',
    status: '',
    user_id:'',
    user:'',
    iva_id:''
  };

  user: string;
  type: string;


  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private productService: ProductService,
    private authService: AuthService,
    private navCtrl: NavController) {
    this.menu.enable(true);
    }

  ngOnInit() {
    this.user = JSON.stringify(this.authService.token.id_user);
    this.type = JSON.stringify(this.authService.token.user_type);
    console.log(this.type);
    if(this.type == '"Cliente"'){
      this.productService.register_quotation_2(this.user, this.user);
    }
  }

  register_quotation(form: NgForm) {
    this.productService.register_quotation(form.value.date_init, form.value.user_id, this.user);
    
  }

}
