import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './components/images/images.component';
import { VideosComponent } from './components/videos/videos.component';
import { PdfsComponent } from './components/pdfs/pdfs.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

const routes: Routes = [
  { path: 'images', component: ImagesComponent },
  { path: 'pdfs', component: PdfsComponent },
  { path: 'videos', component: VideosComponent },
  { path: '', component: FrontPageComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    VideosComponent,
    PdfsComponent,
    FrontPageComponent,
    HeaderComponent,
    SidemenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
