import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';


const routes: Routes = [
  {
    path:'',
    redirectTo: '/inicio/partidos',
    pathMatch: 'full',
  },
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'partidos',
                loadChildren: () => import('../partidos/partidos.module').then( m => m.PartidosPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule )
 
      },
      
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
