import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { ProductService } from 'src/app/services/product.service';
import { MenuController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
})

export class RegisterProductPage implements OnInit {

  product: Product = {
    id: '',
    name: '',
    description: '',
    size: '',
    amount: '',
    color_id: '',
    category_id: '',
    supply_id:'',
    quantity:'',
    user_id:'',
    image: null
  };

  user: string;
  myphoto:any;
  options:any;

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
    console.log(this.user);
    }


  register_product(form: NgForm) {
    this.productService.register_product(form.value.name, form.value.description, form.value.size, form.value.amount, form.value.category_id, form.value.color_id, form.value.supply_id, form.value.quantity, this.user, form.value.image).subscribe(
      data => {
        console.log('entra aqui aqui');
        console.log(data);
      },
      error => {
        
        console.log(error);
      }
    );
  }


}
