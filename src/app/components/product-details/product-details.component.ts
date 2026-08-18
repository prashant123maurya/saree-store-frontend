import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null;

  loading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.errorMessage =
        'Invalid product id.';

      this.loading = false;

      return;
    }

    this.loadProduct(Number(id));
  }

  loadProduct(id: number): void {

    this.productService
      .getProductById(id)
      .subscribe({

        next: (data) => {

          this.product = data;

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load product details.';

          this.loading = false;
        }

      });
  }

  goBack(): void {

    this.router.navigate(['/products']);

  }

  viewProduct(id: number): void {

  this.router.navigate([
    '/products',
    id
  ]);

}

}