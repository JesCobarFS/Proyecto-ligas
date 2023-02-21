import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private http: HttpClient) { }

 
  postArbitros(correo: string, contraseña: string){
    const body ={
      email: correo,
      password: contraseña
    };

    return this.http.post('http://127.0.0.1:8000/api/arbitros_login',body)
    
  }
  GetpartidosA(id:any)  {
    return this.http.get('http://127.0.0.1:8000/api/validar/'+id)
    
  }
  getArbitro(id:any)  {
    return this.http.get('http://127.0.0.1:8000/api/arbitro_datos/'+id)
    
  }
  GetJugadores(id:any)  {
  
    
    return this.http.get('http://127.0.0.1:8000/api/jugadores_equipo_loc/'+id)

  }
  GetJugadores2(id:any)  {
  
    
    return this.http.get('http://127.0.0.1:8000/api/jugadores_equipo_visita/'+id)
    
  }
  GetLogoLocal(id:any)  {
  
    return this.http.get('http://127.0.0.1:8000/api/equipo_loc_foto/'+id)
    
  }
  GetLogoVisitante(id:any)  {
  
    return this.http.get('http://127.0.0.1:8000/api/equipo_vis_foto/'+id)
    
  }
  PostTargeta(tiempo:String,partido:string, jugador: String, amolestacion:number)  {
  
    const body ={
      minuto: tiempo,
      id_partido: partido,
      id_jugador: jugador,
      id_amonestacion: amolestacion
    };
    return this.http.post('http://127.0.0.1:8000/api/estadisticas_registro',body)
    
  }
    PostTargetaReg(partido:string, jugador: String)  {
  
    const body ={
      id_partido: partido,
      id_jugador: jugador,
    };
    return this.http.post('http://127.0.0.1:8000/api/numeroTarjetas',body)
    
  }
  PostFinPartido(partido:string, visitante: number, local:number)  {
  
    const body ={
      id_partido: partido,
      gol_visitante: visitante,
      gol_local: local
    };
    return this.http.post('http://127.0.0.1:8000/api/goles',body)
    
  }
 
 
}


