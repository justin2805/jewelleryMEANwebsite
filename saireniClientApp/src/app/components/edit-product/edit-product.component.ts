import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Products } from './../../Entities/Products.entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  rForm: FormGroup;
  form:any;
  body: Products = new Products();
  id: number;
  originalProdVal: Products = new Products();
  
  constructor(private fb: FormBuilder, private productsservice: ProductsService, private route: ActivatedRoute) { 
    this.rForm = fb.group({
      'prod_name': [null, Validators.required],
      'prod_cost': [null, Validators.required],
      'prod_qty': [null, Validators.required],
      'productType':[null, Validators.required],
      'legal_disclaimer':[null,Validators.required],
      'safety_info':[null,Validators.required],
      'quality':[null,Validators.required],
      'availability':[null,Validators.required],
      'description':[null,Validators.required]   
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('prod_id');
      console.log(this.id)
    })

    this.productsservice.getSingleProduct(this.id).subscribe((res)=>{
        this.originalProdVal = res;
        console.log(res)
        console.log(this.originalProdVal)
      })
  }
  

  onSubmit(form){
    this.body.name = form.prod_name;
    this.body.cost = form.prod_cost;
    this.body.availableQty = form.prod_qty;
    this.body.productType = form.productType;
    this.body.legal_disclaimer = form.legal_disclaimer;
    this.body.safety_info = form.safety_info;
    this.body.quality = form.quality;
    this.body.description = form.description;

    this.body.availability = this.body.availableQty >= 1? true: false;
    // this.contactsService.uploadContact(this.body).subscribe((res)=>{
    //   console.log(res)
    //   this.rForm.reset();
    // })
  }

}
