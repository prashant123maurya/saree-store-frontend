import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl =
    'https://saree-store-backend-fzkj.onrender.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.apiUrl
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/${id}`
    );
  }

  createProduct(
    product: Omit<Product, 'id'>
  ): Observable<Product> {

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

  deleteProduct(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        withCredentials: true
      }
    );
  }
}