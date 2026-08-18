import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  searchTerm: string = '';

  selectedCategory: string = 'All';

  currentPage: number = 1;

  pageSize: number = 10;

  categories: string[] = [];


  constructor(
    private productService: ProductService,
     private router: Router
  ) {}


  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (data) => {

        this.products = data;

        this.categories = [
          'All',
          ...new Set(
            data.map(product => product.category)
          )
        ];

        this.applyFilters();
      },

      error: (error) => {

        console.error(
          'Error loading products:',
          error
        );

      }

    });

  }


  applyFilters(): void {

    let result = this.products;


    // Search

    if (this.searchTerm.trim()) {

      const search =
        this.searchTerm.toLowerCase();

      result = result.filter(product =>
        product.name
          .toLowerCase()
          .includes(search)

        ||

        product.category
          .toLowerCase()
          .includes(search)

        ||

        product.color
          .toLowerCase()
          .includes(search)
      );

    }


    // Category filter

    if (this.selectedCategory !== 'All') {

      result = result.filter(
        product =>
          product.category ===
          this.selectedCategory
      );

    }


    this.filteredProducts = result;

    this.currentPage = 1;

  }


  get paginatedProducts(): Product[] {

    const startIndex =
      (this.currentPage - 1) *
      this.pageSize;

    const endIndex =
      startIndex +
      this.pageSize;

    return this.filteredProducts.slice(
      startIndex,
      endIndex
    );

  }


  get totalPages(): number {

    return Math.ceil(
      this.filteredProducts.length /
      this.pageSize
    );

  }


  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );

  }


  get endIndex(): number {

    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredProducts.length
    );

  }


  goToPage(page: number): void {

    if (
      page >= 1 &&
      page <= this.totalPages
    ) {

      this.currentPage = page;

    }

  }


  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

    }

  }


  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }

  viewProduct(id: number): void {

  console.log('Collection product clicked:', id);

  this.router.navigate(['/products', id]);

}

}