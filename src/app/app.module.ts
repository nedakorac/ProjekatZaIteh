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
import { VideoDetailsComponent } from './videos/video-details/video-details.component';
import { PdfsComponent } from './pdfs/pdfs.component';
import { PdfDetailComponent } from './pdfs/pdf-detail/pdf-detail.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './safe.pipe';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'myProducts', component: MyProductsComponent },
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
    PdfDetailComponent,
    LoginComponent,
    SafePipe,
    MyProductsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
