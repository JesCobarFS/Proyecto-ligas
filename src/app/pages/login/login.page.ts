import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordIcon = 'eye';

  users: any;
  arbitro = {
    correo: '',
    contrasena: '',
  };

  constructor(
    private dataService: DataService,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
   
    //this.presentLoading();

    if (!this.arbitro.correo || !this.arbitro.contrasena) {
      
      this.camposVacios();
      this.loadingCtrl.dismiss()
    } else {

      

      this.dataService
        .postArbitros(this.arbitro.correo, this.arbitro.contrasena)
        .subscribe(
          (res: any) => {
            this.users = res;
            console.log(this.users.datos.id);

            localStorage.setItem('id', this.users.datos.id);
            this.navCtrl.navigateForward('/inicio');

            this.loadingCtrl.dismiss();
          },
          (error) => {
            this.loadingCtrl.dismiss();
            this.usuarioNoEnc();
            
          }
        );
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;

    if (this.passwordIcon == 'eye') {
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordIcon = 'eye';
    }
  }

  

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando Sesión...',
      
      cssClass: 'custom-loading',
    });
    await loading.present();
   }



  async camposVacios() {
    const toast = await this.toastCtrl.create({
      message: 'Los campos estan vacios.',
      duration: 2000,
    });
    toast.present();
  }
  async usuarioNoEnc() {
    const toast = await this.toastCtrl.create({
      message: 'Usuario no encontrado.',
      duration: 2000,
    });
    toast.present();
  }
}
