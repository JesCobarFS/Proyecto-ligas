import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'partidos/:id',
  //   loadChildren: () => import('./pages/partidos/partidos.module').then( m => m.PartidosPageModule)
  // },
  {
    path: 'partido',
    loadChildren: () => import('./pages/partido/partido.module').then( m => m.PartidoPageModule)
  },
  
  // {
  //   path: 'perfil/:id',
  //   loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  // },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  }

   

  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
