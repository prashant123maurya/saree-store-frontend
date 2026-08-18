import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }



 deleteProduct(id: number): Observable<void> {

  return this.http.delete<void>(
    `${this.apiUrl}/${id}`,
    {
      withCredentials: true
    }
  );

}

createProduct(product: Omit<Product, 'id'>): Observable<Product> {

  return this.http.post<Product>(
    this.apiUrl,
    product,
    {
      withCredentials: true
    }
  );

}

updateProduct(
  id: number,
  product: Omit<Product, 'id'>
): Observable<Product> {

  return this.http.put<Product>(
    `${this.apiUrl}/${id}`,
    product,
    {
      withCredentials: true
    }
  );
}

getProductById(id: number): Observable<Product> {

  return this.http.get<Product>(
    `${this.apiUrl}/${id}`
  );

}


}
