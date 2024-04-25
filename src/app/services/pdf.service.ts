import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
 
  private pdfsSubject = new BehaviorSubject<Product[]>([]);
  public pdfs$ = this.pdfsSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadPdfsByType(): Observable<Product[]> {
    let type = "pdf"; 
    return this.httpClient.get<{ data: Product[] }>(`http://127.0.0.1:8000/api/products/${type}`).pipe(
      map(response => response.data.map(pdf => new Product(
        pdf.product_id,
        pdf.name,
        pdf.price,
        pdf.type,
        pdf.category,
        pdf.author,
        pdf.num_of_downloads,
        `http://127.0.0.1:8000/${pdf.full_product}`,  
        `http://127.0.0.1:8000/${pdf.free_version}`,  
        `http://127.0.0.1:8000/${pdf.imageUrl}`
      ))),
      tap(pdfs => {
        console.log(pdfs);
        this.pdfsSubject.next(pdfs);
      }),
      catchError(error => {
        console.error('Error loading PDFs:', error);
        return throwError(() => new Error('Error loading PDFs'));
      })
    );
  }
  filterPdfs(filteredProducts: Product[]) {
    console.log(filteredProducts);
    this.pdfsSubject.next(filteredProducts);
  }

}
