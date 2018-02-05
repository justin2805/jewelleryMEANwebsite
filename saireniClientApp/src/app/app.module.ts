import { OrdersService } from './services/orders.service';
import { SaireniAuthInterceptor } from './services/saireni.interceptor';
import { LogoutComponent } from './components/logout/logout.component';
import { RequestStockService } from './services/request-stock.service';
import { ContactUsService } from './services/contact-us.service';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { CartService } from './services/cart.service';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { OthersComponent } from './components/others/others.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JewelleriesComponent } from './components/jewelleries/jewelleries.component';
import { MobileCasesComponent } from './components/mobile-cases/mobile-cases.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { UserService } from './services/user.service';
import { ProductsService } from './services/products.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PasswordValidation } from './Utils/password.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ViewContactEntriesComponent } from './components/view-contact-entries/view-contact-entries.component';
import { RequestStockComponent } from './components/request-stock/request-stock.component';
import { ViewStockRequestsComponent } from './components/view-stock-requests/view-stock-requests.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:productId', component: ProductComponent},
  {path: 'jewelleries', component: JewelleriesComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'mobilecases', component: MobileCasesComponent},
  {path: 'others', component: OthersComponent},
  {path: 'login', component:LoginComponent},
  {path: 'contact_us', component: ContactUsComponent},
  {path: 'about_us', component: AboutUsComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'unauthorized', component: UnAuthorizedComponent},
  {path: 'cart', component:ShoppingCartComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'add_product', component: AddProductComponent, canActivate: [AuthGuardService]},
  {path: 'view_orders', component: ViewOrdersComponent},
  {path: 'view_contact_entries', component:ViewContactEntriesComponent, canActivate: [AuthGuardService]},
  {path: 'view_requested_stock_entries', component:ViewStockRequestsComponent, canActivate: [AuthGuardService]},
  {path: 'order_details/:orderId', component: OrderDetailsComponent},
  {path: 'request_stock/:name/:productId',component:RequestStockComponent},
  {path: 'edit_product/:prod_id', component: EditProductComponent, canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OthersComponent,
    AccessoriesComponent,
    JewelleriesComponent,
    MobileCasesComponent,
    NotFoundComponent,
    ProductComponent,
    LoginComponent,
    ContactUsComponent,
    AboutUsComponent,
    RegisterComponent,
    AddProductComponent,
    EditProductComponent,
    ShoppingCartComponent,
    ViewContactEntriesComponent,
    RequestStockComponent,
    ViewStockRequestsComponent,
    UnAuthorizedComponent,
    LogoutComponent,
    ViewOrdersComponent,
    OrderDetailsComponent
    ],
  providers: [
    UserService,
    ProductsService,
    LoginService,
    RegisterService,
    CartService,
    ContactUsService,
    RequestStockService,
    HttpClientModule,
    OrdersService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SaireniAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }