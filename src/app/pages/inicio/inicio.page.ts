import { Component, OnInit} from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
result: string;
handlerMessage = '';
roleMessage = '';
 

  constructor(  public navCtrl: NavController,
                private alertController: AlertController,
                private toastCtrl: ToastController) { }

  ngOnInit() {
   

  }

  async  cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { this.handlerMessage = 'Alert canceled'; }
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {   
            this.navCtrl.navigateForward('/login')
            this.fin();
      
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }
  async fin() {
    const toast = await this.toastCtrl.create({
      message: 'Sesió finalizada',
      duration: 2000,
    });
    toast.present();
  }



}
