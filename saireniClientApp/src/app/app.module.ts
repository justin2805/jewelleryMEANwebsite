import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { CartService } from './services/cart.service';
import { AuthService } from './auth/auth.service';
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
import { ProductTokenAuthInterceptor } from './auth/product_token_auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PasswordValidation } from './Utils/password.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'jewelleries/:productId', component: ProductComponent},
  {path: 'jewelleries', component: JewelleriesComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'mobilecases', component: MobileCasesComponent},
  {path: 'others', component: OthersComponent},
  {path: 'login', component:LoginComponent},
  {path: 'contact_us', component: ContactUsComponent},
  {path: 'about_us', component: AboutUsComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'cart', component:ShoppingCartComponent, canActivate: [LoginService]},
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
    ShoppingCartComponent
    ],
  providers: [
    UserService,
    ProductsService,
    LoginService,
    RegisterService,
    CartService,
    HttpClientModule,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductTokenAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }