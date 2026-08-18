import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ProductService } from '../../../services/product.service';

import { Product } from '../../../models/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!: number;

  product: Omit<Product, 'id'> = {

    name: '',
    description: '',
    category: '',
    price: 0,
    sellingPrice: 0,
    color: ''

  };

  loading = false;

  errorMessage = '';

  successMessage = '';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}


  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.router.navigate(
        ['/admin/dashboard']
      );

      return;
    }

    this.productId = Number(id);

    this.loadProduct();

  }


  loadProduct(): void {

    this.loading = true;

    this.productService
      .getProductById(this.productId)
      .subscribe({

        next: (data) => {

          this.product = {

            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            sellingPrice: data.sellingPrice,
            color: data.color

          };

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load saree details.';

          this.loading = false;

        }

      });

  }


  updateProduct(): void {

    this.errorMessage = '';
    this.successMessage = '';

    this.productService
      .updateProduct(
        this.productId,
        this.product
      )
      .subscribe({

        next: () => {

          this.successMessage =
            'Saree updated successfully.';

          setTimeout(() => {

            this.router.navigate(
              ['/admin/dashboard']
            );

          }, 1000);

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to update saree.';

        }

      });

  }


  cancel(): void {

    this.router.navigate(
      ['/admin/dashboard']
    );

  }

}