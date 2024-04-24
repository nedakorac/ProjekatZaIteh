import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../../services/pdf.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-detail',
  templateUrl: './pdf-detail.component.html',
  styleUrls: ['./pdf-detail.component.css']
})
export class PdfDetailComponent implements OnInit, OnDestroy {
  selectedPdf!: Product;
  safeUrl!: SafeResourceUrl;
  isFullVersion: boolean = false;
  isFreeVersion: boolean = true;
  isOwner: boolean = true;
  subscription!: Subscription;
  ready = false;
  displayedPdf!: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private pdfService: PdfService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.subscription = this.pdfService.pdfs$.subscribe(pdfs => {
      const pdf = pdfs.find(p => p.product_id === id);
      if (pdf) {
        this.selectedPdf = pdf;
        this.ready = true;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdf.free_version);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  setVersion(version: string): void {
    if (version === 'full') {
      if (!this.isOwner) {
        alert("You do not own the full version! You must buy it first in order to access it.");
        return;
      }
      this.isFullVersion = true;
      this.isFreeVersion = false;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedPdf.full_product);
      } else if (version === 'free') {
      this.isFullVersion = false;
      this.isFreeVersion = true;
      this.displayedPdf= this.selectedPdf.free_version;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedPdf.free_version);
    }
  }

  buyVersion(): void {
    // Implement purchase logic here
  }
}
