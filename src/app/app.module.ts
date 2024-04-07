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
import { PdfComponent } from './detailedView/pdf/pdf.component';
import { NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageDetailsComponent } from './components/images/image-details/image-details.component';

const routes: Routes = [
  { path: 'images/:id', component: ImageDetailsComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'pdfs', component: PdfComponent },
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
    SidemenuComponent,
    PdfComponent,
    ImageDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
