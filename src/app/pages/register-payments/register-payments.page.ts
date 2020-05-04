import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { MenuController } from '@ionic/angular';
import { Pay } from 'src/app/models/pay';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-payments',
  templateUrl: './register-payments.page.html',
  styleUrls: ['./register-payments.page.scss'],
})
export class RegisterPaymentsPage implements OnInit {

  pay: Pay = {
    id: '',
    bank: '',
    confirmation: '',
    pay_format: '',
    amount: '',
    description: '',
    user: '',
    quotation_id: ''
  };

  user: string;
  order_id: any;

  constructor(
    private menu: MenuController,
    private http: HttpClient,
    private env: EnvService,
    private storage: Storage,
    private productService: ProductService,
    private authService: AuthService) {
    this.menu.enable(true);
    }


  ngOnInit() {
    this.user = JSON.stringify(this.authService.token.id_user);
    this.order_id = this.productService.order_id_find;
    console.log(this.user);
    console.log(this.productService.order_id_find, 'AJAAAAAAORDERRRRRRRRRRRR');
    }

    register_payment(form: NgForm){
      this.productService.register_payment(form.value.bank, form.value.confirmation, form.value.pay_format, form.value.amount, form.value.description, this.user, this.productService.order_id_find);
    }


}
