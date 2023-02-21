import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { HeaderComponent } from './header/header.component';










@NgModule({
  declarations: [
   SplashScreenComponent,
   HeaderComponent
    
  
 
   
  ],
  exports:[
    SplashScreenComponent,
    HeaderComponent  
   

  
  ],
  
  imports: [
    CommonModule,
    IonicModule
  
    
  ]
})
export class ComponentsModule { }
