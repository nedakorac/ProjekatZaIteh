import { Component } from '@angular/core';
import GcPdfViewer from '@grapecity/gcpdfviewer';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrl: './pdfs.component.css'
})
export class PdfsComponent {
  gAfterViewInit() {
    const viewer = new GcPdfViewer("#viewer", {
      workerSrc: "//node_modules/@grapecity/gcpdfviewer/gcpdfviewer.worker.js",
      restoreViewStateOnLoad: false
    });
    viewer.addDefaultPanels();
  }
}
