import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {
  result = localStorage.getItem('id');
  users: any;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private activateRouted: ActivatedRoute,
    private dataService: DataService,
    public navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.partidos();
  }

  partidos() {
    this.dataService.GetpartidosA(this.result).subscribe((data) => {
      this.users = data;

      console.log('Somos los partidos', this.users);
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.users = this.users;
      event.target.complete();
    }, 1500);
  }

  async presentAlert(item, logoLocal, logoVist, nombreLoc, nombreVist) {
    const alert = await this.alertController.create({
      header: 'Iniciar Partido',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.navCtrl.navigateForward('/partido');
            localStorage.setItem('id_partido', item);
            localStorage.setItem('logoLocal', logoLocal);
            localStorage.setItem('logoVist', logoVist);
            localStorage.setItem('nombreLoc', nombreLoc);
            localStorage.setItem('nombreVist', nombreVist);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
