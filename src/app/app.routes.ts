import { Routes } from '@angular/router';

import { HomeComponent }
  from './components/home/home.component';

import { ProductListComponent }
  from './components/product-list/product-list.component';

import { AdminLoginComponent }
  from './components/admin/admin-login/admin-login.component';

import { AdminDashboardComponent }
  from './components/admin/admin-dashboard/admin-dashboard.component';

import { AddProductComponent }
  from './components/admin/add-product/add-product.component';

import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'products',
    component: ProductListComponent
  },

  {
    path: 'admin/login',
    component: AdminLoginComponent
  },

 {
  path: 'admin/dashboard',

  loadComponent: () =>
    import('./components/admin/admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent),

  canActivate: [AuthGuard]
},

{
  path: 'admin/products/add',

  loadComponent: () =>
    import('./components/admin/add-product/add-product.component')
      .then(m => m.AddProductComponent),

  canActivate: [AuthGuard]
},

{
  path: 'admin/products/edit/:id',

  loadComponent: () =>
    import('./components/admin/edit-product/edit-product.component')
      .then(m => m.EditProductComponent),

  canActivate: [AuthGuard]
},

{
  path: 'products/:id',

  loadComponent: () =>
    import('./components/product-details/product-details.component')
      .then(m => m.ProductDetailsComponent)
}

];