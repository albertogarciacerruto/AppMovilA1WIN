import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },

  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] },
  { path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule' },
  { path: 'register-product', loadChildren: './pages/register-product/register-product.module#RegisterProductPageModule' },
  { path: 'register-user', loadChildren: './pages/register-user/register-user.module#RegisterUserPageModule' },
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'update-user', loadChildren: './pages/update-user/update-user.module#UpdateUserPageModule' },
  { path: 'register-inventory', loadChildren: './pages/register-inventory/register-inventory.module#RegisterInventoryPageModule' },
  { path: 'inventories', loadChildren: './pages/inventories/inventories.module#InventoriesPageModule' },
  { path: 'register-quotation', loadChildren: './pages/register-quotation/register-quotation.module#RegisterQuotationPageModule' },
  { path: 'detail-inventories', loadChildren: './pages/detail-inventories/detail-inventories.module#DetailInventoriesPageModule' },
  { path: 'quotations', loadChildren: './pages/quotations/quotations.module#QuotationsPageModule' },
  { path: 'inventory-quotation', loadChildren: './pages/inventory-quotation/inventory-quotation.module#InventoryQuotationPageModule' },
  { path: 'confirmation-quotation', loadChildren: './pages/confirmation-quotation/confirmation-quotation.module#ConfirmationQuotationPageModule' },
  { path: 'register-order', loadChildren: './pages/register-order/register-order.module#RegisterOrderPageModule' },
  { path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule' },
  { path: 'detail-order', loadChildren: './pages/detail-order/detail-order.module#DetailOrderPageModule' },
  { path: 'inventory-existence', loadChildren: './pages/inventory-existence/inventory-existence.module#InventoryExistencePageModule' },
  { path: 'supply-existence', loadChildren: './pages/supply-existence/supply-existence.module#SupplyExistencePageModule' },
  { path: 'register-supply', loadChildren: './pages/register-supply/register-supply.module#RegisterSupplyPageModule' },
  { path: 'payments', loadChildren: './pages/payments/payments.module#PaymentsPageModule' },
  { path: 'register-payments', loadChildren: './pages/register-payments/register-payments.module#RegisterPaymentsPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
