import { Component } from '@angular/core';
import { Product } from '../models/product';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrl: './pdfs.component.css'
})
export class PdfsComponent {
  pdfs?: Product[] ;

  constructor(private pdfService: PdfService){

  }

  ngOnInit(): void {
    this.pdfs = this.pdfService.pdfs;
  }
}
