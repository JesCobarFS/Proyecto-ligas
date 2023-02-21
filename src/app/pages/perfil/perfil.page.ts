import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  result = localStorage.getItem('id');
  users: any;
  nombre: String;
  correo: string;
  edad: number;
  foto: string;

  constructor(
    private activateRouted: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getArbitro(this.result).subscribe((data) => {
      this.users = data;
      console.log(this.users);
      this.nombre = this.users.Nombre_arbitro;
      this.correo = this.users.Email;
      this.edad = this.users.Edad;
      this.foto = this.users.Foto_arbitro;
    });
  }
}
