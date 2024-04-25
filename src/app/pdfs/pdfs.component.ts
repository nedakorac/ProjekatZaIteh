import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PdfService } from '../services/pdf.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent implements OnInit, OnDestroy {
  pdfs: Product[] = [];
  private subscription!: Subscription;

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {
    this.subscription = this.pdfService.pdfs$.subscribe({
      next: (pdfs) => {
        this.pdfs = pdfs;
      },
      error: (error) => console.error('Failed to load pdfs', error)
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
