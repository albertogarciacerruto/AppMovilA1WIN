import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: User;
  prueba: string;
  constructor(private menu: MenuController, private authService: AuthService) {
    this.menu.enable(true);
  }
  ngOnInit() {
    this.prueba = JSON.stringify(this.authService.token.id_user);
    console.log(this.prueba);
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }
}
