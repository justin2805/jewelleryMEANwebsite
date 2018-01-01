import { AuthService } from './auth/auth.service';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
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

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'jewelleries/:productId', component: ProductComponent},
  {path: 'jewelleries', component: JewelleriesComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'mobilecases', component: MobileCasesComponent},
  {path: 'others', component: OthersComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
    ProductComponent
  ],
  providers: [
    UserService,
    ProductsService,
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
