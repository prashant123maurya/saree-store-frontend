import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  products: Product[] = [];

  categoriesCount: number = 0;

  averagePrice: number = 0;


  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadProducts();

  }


  loadProducts(): void {

    this.productService.getProducts()
      .subscribe({

        next: (data) => {

          this.products = data;

          this.calculateStatistics();

        },

        error: (error) => {

          console.error(
            'Error loading products:',
            error
          );

        }

      });

  }


  calculateStatistics(): void {

    // Categories

    const categories =
      new Set(
        this.products.map(
          product => product.category
        )
      );

    this.categoriesCount =
      categories.size;


    // Average price

    if (this.products.length > 0) {

      const total =
        this.products.reduce(
          (sum, product) =>
            sum + Number(product.sellingPrice),
          0
        );

      this.averagePrice =
        Math.round(
          total / this.products.length
        );

    } else {

      this.averagePrice = 0;

    }

  }


  addProduct(): void {

    this.router.navigate([
      '/admin/products/add'
    ]);

  }


  editProduct(id: number): void {

    this.router.navigate([
      '/admin/products/edit',
      id
    ]);

  }


  deleteProduct(id: number): void {

    const confirmed =
      confirm(
        'Are you sure you want to delete this saree?'
      );

    if (!confirmed) {
      return;
    }


    this.productService.deleteProduct(id)
      .subscribe({

        next: () => {

          this.products =
            this.products.filter(
              product => product.id !== id
            );

          this.calculateStatistics();

        },

        error: (error) => {

          console.error(
            'Error deleting product:',
            error
          );

        }

      });

  }


 logout(): void {

  console.log('Logout button clicked');

  this.authService.logout()
    .subscribe({

      next: () => {

        console.log('Logout successful');

        this.router.navigate(
          ['/admin/login'],
          { replaceUrl: true }
        );

      },

      error: (error) => {

        console.error(
          'Logout API failed:',
          error
        );

        // Still redirect to login
        this.router.navigate(
          ['/admin/login'],
          { replaceUrl: true }
        );

      }

    });
}

}