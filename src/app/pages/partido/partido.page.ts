import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  contador = 0;
  mensaje = '';

  logoLocal = localStorage.getItem('logoLocal');
  logoVist = localStorage.getItem('logoVist');
  nombreLocal = localStorage.getItem('nombreLoc');
  nombreVisit = localStorage.getItem('nombreVist');
  //Tarjetas
  roja = 1;
  amarrilla = 2;
  handlerMessage = '';
  GolLoc = 0;
  GolVis = 0;
  minutos: number;
  segundos: number;
  horas: number;
  isPaused: boolean;
  buttonLabel: string;
  tiempo: string;

  result = localStorage.getItem('id_partido');
  jugadorLocal: any;
  jugadorVisit: any;

  targetLocalA = [];
  targetLocalR = [];

  targetVisitA = [];
  targetVisitR = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private activateRouted: ActivatedRoute,
    private dataService: DataService,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.Equipo_local();
    this.Equipo_Visitante();
    this.resetTimer();
    setInterval(() => this.tick(), 1000);
  }

  Equipo_local() {
    this.dataService.GetJugadores(this.result).subscribe((data) => {
      this.jugadorLocal = data;

      console.log(this.jugadorLocal.length);

      for (let index = 0; index < this.jugadorLocal.length; index++) {
        this.targetLocalA.push(0);
      }

      for (let index = 0; index < this.jugadorLocal.length; index++) {
        this.targetLocalR.push(0);
      }
    });
  }

  Equipo_Visitante() {
    this.dataService.GetJugadores2(this.result).subscribe((data) => {
      this.jugadorVisit = data;

      console.log(this.jugadorVisit.length);

      for (let index = 0; index < this.jugadorVisit.length; index++) {
        this.targetVisitA.push(0);
      }

      for (let index = 0; index < this.jugadorVisit.length; index++) {
        this.targetVisitR.push(0);
      }
    });
  }

  resetTimer() {
    this.isPaused = false;
    this.minutos = 0;
    this.segundos = 0;
    this.horas = 0;
    this.iniciar();
    this.buttonLabel = 'play-circle';
    this.mensaje = 'iniciar';
  }

  tick() {
    if (!this.isPaused) {
      this.buttonLabel = 'stop';
      this.mensaje = 'detener';

      if (++this.segundos > 59) {
        this.segundos = 0;
        if (++this.minutos > 59) {
          this.minutos = 0;
          this.segundos = 0;

          if (++this.horas > 24) {
            this.resetTimer();
          }
        }
      }
      this.tiempo = `${this.horas}:${this.minutos}:${this.segundos}`;
    }
  }

  iniciar() {
    this.isPaused = !this.isPaused;
    if (this.minutos < 59 || this.segundos < 59 || this.horas < 24) {
      this.buttonLabel = this.isPaused ? 'play-circle' : 'stop';
      this.mensaje = this.isPaused ? 'iniciar' : 'detener';
    }
  }
  async iniciarPrimero() {
    const alert = await this.alertController.create({
      header: 'Deseas ' + this.mensaje + ' el partido',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.iniciar();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async golLoc(nombre) {
    const alert = await this.alertController.create({
      header: 'Gol:' + nombre,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.GolLoc++;
            this.gol(nombre);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async golVist(nombre) {
    const alert = await this.alertController.create({
      header: 'Gol:' + nombre,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.GolVis++;
            this.gol(nombre);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async AmarillaLocal(id, numero, indice) {
    const alert = await this.alertController.create({
      header: 'Amarilla:' + numero,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.dataService
              .PostTargeta(this.tiempo, this.result, id, this.amarrilla)
              .subscribe((res: any) => {
                console.log(res);
              });
            this.targetLocalA[indice];
            this.targetLocalR[indice];

            if (this.targetLocalR[indice] === 0) {
              if (this.targetLocalA[indice] <= 1) {
                this.targetLocalA[indice]++;
                this.targetAR();

                if (this.targetLocalA[indice] == 2) {
                  this.targetLocalR[indice] = 1;
                  this.targetRR();
                }
              }
            } else {
              this.jugadorExpuldado();
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async AmarillaVisit(id, numero, indice) {
    const alert = await this.alertController.create({
      header: 'Amarilla:' + numero,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.dataService
              .PostTargeta(this.tiempo, this.result, id, this.amarrilla)
              .subscribe((res: any) => {
                console.log(res);
              });
            this.targetVisitA[indice];
            this.targetVisitR[indice];

            if (this.targetVisitR[indice] === 0) {
              if (this.targetVisitA[indice] <= 1) {
                this.targetVisitA[indice]++;
                this.targetAR();

                if (this.targetVisitA[indice] == 2) {
                  this.targetVisitR[indice] = 1;
                  this.targetRR();
                }
              }
            } else {
              this.jugadorExpuldado();
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async RojaLocal(id, numero, indice) {
    const alert = await this.alertController.create({
      header: 'Roja:' + numero,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.dataService
              .PostTargeta(this.tiempo, this.result, id, this.roja)
              .subscribe((res: any) => {
                console.log(res);
              });
            this.targetLocalA[indice];
            if (this.targetLocalR[indice] === 0) {
              this.targetLocalR[indice]++;
              this.targetRR();
            } else {
              this.jugadorExpuldado();
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async RojaVisit(id, numero, indice) {
    const alert = await this.alertController.create({
      header: 'Roja:' + numero,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.dataService
              .PostTargeta(this.tiempo, this.result, id, this.roja)
              .subscribe((res: any) => {
                console.log(res);
              });
            this.targetVisitA[indice];
            if (this.targetVisitR[indice] === 0) {
              this.targetVisitR[indice]++;
              this.targetRR();
            } else {
              this.jugadorExpuldado();
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async finPartido() {
    const alert = await this.alertController.create({
      header: 'Finalizar Partido',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            console.log('fin partido');
            console.log('gol-vist', this.GolVis);
            console.log('gol-loca', this.GolLoc);
            console.log('id partido', this.result);
            // this.navCtrl.navigateForward('/inicio');

            this.dataService
              .PostFinPartido(this.result, this.GolVis, this.GolLoc)
              .subscribe((data) => {
                console.log('partido finalizado');
              });
            this.navCtrl.navigateForward('/inicio');
            console.log('partido finalizado');
            this.fin();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async targetAR() {
    const toast = await this.toastCtrl.create({
      message: 'Targeta Amarilla Registrada',
      duration: 2000,
    });
    toast.present();
  }

  async targetRR() {
    const toast = await this.toastCtrl.create({
      message: 'Targeta Roja Registrada',
      duration: 2000,
    });
    toast.present();
  }
  async jugadorExpuldado() {
    const toast = await this.toastCtrl.create({
      message: 'El Jugador ya esta expulsado',
      duration: 2000,
    });
    toast.present();
  }
  async gol(equipo) {
    const toast = await this.toastCtrl.create({
      message: 'Gol de ' + equipo,
      duration: 2000,
    });
    toast.present();
  }
  async fin() {
    const toast = await this.toastCtrl.create({
      message: 'Partido Finalizado',
      duration: 2000,
    });
    toast.present();
  }
}
