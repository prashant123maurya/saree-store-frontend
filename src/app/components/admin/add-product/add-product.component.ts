import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  NgForm
} from '@angular/forms';

import { Router } from '@angular/router';

import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-add-product',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  product = {
    name: '',
    description: '',
    category: '',
    price: null as number | null,
    sellingPrice: null as number | null,
    color: ''
  };


  isSubmitting = false;

  errorMessage = '';

  successMessage = '';


  constructor(
    private productService: ProductService,
    private router: Router
  ) {}


  saveProduct(form: NgForm): void {

    if (form.invalid) {

      form.control.markAllAsTouched();

      return;

    }


    this.isSubmitting = true;

    this.errorMessage = '';


    const product = {

      name: this.product.name.trim(),

      description:
        this.product.description.trim(),

      category:
        this.product.category.trim(),

      price:
        Number(this.product.price),

      sellingPrice:
        Number(this.product.sellingPrice),

      color:
        this.product.color.trim()

    };


    this.productService
      .createProduct(product)
      .subscribe({

        next: () => {

          this.isSubmitting = false;

          this.successMessage =
            'Saree added successfully!';

          setTimeout(() => {

            this.router.navigate([
              '/admin/dashboard'
            ]);

          }, 800);

        },


        error: (error) => {

          this.isSubmitting = false;

          console.error(
            'Error creating product:',
            error
          );

          this.errorMessage =
            'Unable to add saree. Please try again.';

        }

      });

  }


  cancel(): void {

    this.router.navigate([
      '/admin/dashboard'
    ]);

  }

}