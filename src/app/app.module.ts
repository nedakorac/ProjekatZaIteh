import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './components/images/images.component';
import { VideosComponent } from './components/videos/videos.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { PdfComponent } from './detailedView/pdf/pdf.component';
import { NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageDetailsComponent } from './components/images/image-details/image-details.component';
import { VideoDetailsComponent } from './components/videos/video-details/video-details.component';
import { PdfsComponent } from './pdfs/pdfs.component';
import { PdfDetailComponent } from './pdfs/pdf-detail/pdf-detail.component';

const routes: Routes = [
  { path: 'images/:id', component: ImageDetailsComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'pdfs/:id', component: PdfDetailComponent },
  { path: 'pdfs', component: PdfsComponent },
  { path: 'videos/:id', component: VideoDetailsComponent },
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
    ImageDetailsComponent,
    VideoDetailsComponent,
    PdfDetailComponent
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
