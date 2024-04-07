import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent {

  isFullVersion: boolean = false;
  isFreeVersion: boolean = true; 

  isOwner: boolean = false;

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
