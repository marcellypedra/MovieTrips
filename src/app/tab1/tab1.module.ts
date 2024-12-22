import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1PageRoutingModule } from './tab1-routing.module';

import { Tab1Page } from './tab1.page';
import { PostComponent } from '../widgets/post/post.component';

import { NewpostComponent } from '../widgets/newpost/newpost.component';

import { HeaderComponent } from '../widgets/header/header.component';
import { UserComponent } from '../widgets/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule,
    
    
  ],
  declarations: [Tab1Page, PostComponent, NewpostComponent, HeaderComponent, UserComponent],
  exports: [ NewpostComponent, HeaderComponent, UserComponent ]
})
export class Tab1PageModule {}
