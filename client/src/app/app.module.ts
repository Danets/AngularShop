import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

import { TokenInterceptor } from './shared/helpers/token.interceptor';
import { OverviewComponent } from './components/overview/overview.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HistoryComponent } from './components/history/history.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { PositionsFormComponent } from './components/categories/categories-form/positions-form/positions-form.component';
import { OrderCategoriesComponent } from './components/orders/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/orders/order-positions/order-positions.component';
import { HistoryListComponent } from './components/history/history-list/history-list.component';
import { HistoryFilterComponent } from './components/history/history-filter/history-filter.component';
import { ToTopComponent } from './shared/components/to-top/to-top.component';
import { LoaderCircularCustomComponent } from './shared/components/loader-circular-custom/loader-circular-custom.component';
import { FlatPipe } from './shared/pipes/flat.pipe';
import { SwitcherComponent } from './shared/components/switcher/switcher.component';
import { CounterComponent } from './shared/components/counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewComponent,
    AnalyticsComponent,
    HistoryComponent,
    OrdersComponent,
    CategoriesComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    ToTopComponent,
    LoaderCircularCustomComponent,
    FlatPipe,
    SwitcherComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
