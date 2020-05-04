import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { RegisterPage } from './pages/auth/register/register.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  email = '';
  pass = '';
  type = '';
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Registrar Usuario',
      url: '/register-user',
      icon: 'person-add'
    },
    {
      title: 'Usuarios',
      url: '/users',
      icon: 'person'
    },
    {
      title: 'Productos',
      url: '/products',
      icon: 'shirt'
    },
    {
      title: 'Inventario',
      url: '/inventories',
      icon: 'cube'
    },
    {
      title: 'Cotizaciones',
      url: '/quotations',
      icon: 'create'
    },
    {
      title: 'Registar Cotización',
      url: '/register-quotation',
      icon: 'pricetags'
    },
    {
      title: 'Pedidos',
      url: '/orders',
      icon: 'clipboard'
    },
    {
      title: 'Verificar Existencia',
      url: '/inventory-existence',
      icon: 'help'
    }
  ];

  public appPagesCustomer = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Inventario',
      url: '/inventories',
      icon: 'cube'
    },
    {
      title: 'Cotizaciones',
      url: '/quotations',
      icon: 'create'
    },
    {
      title: 'Registar Cotización',
      url: '/register-quotation',
      icon: 'pricetags'
    },
    {
      title: 'Pedidos',
      url: '/orders',
      icon: 'clipboard'
    }
  ];

  public appPagesProductor = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Productos',
      url: '/products',
      icon: 'shirt'
    },
    {
      title: 'Verificar Existencia',
      url: '/inventory-existence',
      icon: 'help'
    }

  ];

  public appPagesVendedor = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Registrar Usuario',
      url: '/register-user',
      icon: 'person-add'
    },
    {
      title: 'Usuarios',
      url: '/users',
      icon: 'person'
    },
    {
      title: 'Inventario',
      url: '/inventories',
      icon: 'cube'
    },
    {
      title: 'Cotizaciones',
      url: '/quotations',
      icon: 'create'
    },
    {
      title: 'Registar Cotización',
      url: '/register-quotation',
      icon: 'pricetags'
    },
    {
      title: 'Pedidos',
      url: '/orders',
      icon: 'clipboard'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private modalController: ModalController,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }
  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }
  // When Logout Button is pressed
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast('Se ha cerrado la sesión exitosamente.');
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/landing');
      }
    );
  }
}
