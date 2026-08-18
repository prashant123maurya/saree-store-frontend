import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit {

  products: Product[] = [];
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
         this.featuredProducts = data.slice(0, 4);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  viewProduct(id: number): void {
  
   console.log('Product ID:', id);
  this.router.navigate([
    '/products',
    id
  ]);

}


}