import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../../services/pdf.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-pdf-detail',
  templateUrl: './pdf-detail.component.html',
  styleUrl: './pdf-detail.component.css'
})
export class PdfDetailComponent {
  selectedVideo!: Product;
  isFullVersion: boolean = false;
  isFreeVersion: boolean = true; 

  isOwner: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private pdfService: PdfService){

  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.selectedVideo = this.pdfService.pdfs.at(id)!;
  }

  setVersion(version: string): void {
    if (version === 'full') {
      if(!this.isOwner){
        alert("You do not own full version! You have to buy it first in order to access it.");
        return;
      }
      this.isFullVersion = true;
      this.isFreeVersion = false;
    } else if (version === 'free') {
      this.isFullVersion = false;
      this.isFreeVersion = true;
    }
  }

  buyVersion() {
    //ODRADI OVO
     }
}
