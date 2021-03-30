import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './shared/helpers/auth.guard';
import { OverviewComponent } from './components/overview/overview.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HistoryComponent } from './components/history/history.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { OrderCategoriesComponent } from './components/orders/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/orders/order-positions/order-positions.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { 
        path: 'ui-components',
        loadChildren: () => import('./components/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'history', component: HistoryComponent },
      {
        path: 'orders',
        component: OrdersComponent,
        children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent },
        ],
      },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/new', component: CategoriesFormComponent },
      { path: 'categories/:id', component: CategoriesFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
