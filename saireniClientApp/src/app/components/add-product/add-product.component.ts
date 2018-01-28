import { ProductsService } from './../../services/products.service';
import { Products } from './../../Entities/Products.entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,ChangeDetectorRef, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  rForm: FormGroup;
  form:any;
  body: Products = new Products();
  private formData: FormData = new FormData();
  private successMsg: string = '';
  private errorMsg: string = '';
  
  constructor(private fb: FormBuilder, 
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef,
    private el: ElementRef) { 
    this.rForm = fb.group({
      'prod_name': [null, Validators.required],
      'prod_cost': [null, Validators.required],
      'prod_qty': [null, Validators.required],
      'productType':[null, Validators.required],
      'legal_disclaimer':[null],
      'safety_info':[null],
      'quality':[null],
      'availability':[null],
      'description':[null,Validators.required]   
    })
  }

  ngOnInit() {
     
  }
  

  onSubmit(form){
    // this.body.name = form.prod_name;
    // this.body.cost = form.prod_cost;
    // this.body.availableQty = form.prod_qty;
    // this.body.productType = form.productType;
    // this.body.legal_disclaimer = form.legal_disclaimer;
    // this.body.safety_info = form.safety_info;
    // this.body.quality = form.quality;
    // this.body. = form.description;
    // this.body.availability = form.prod_qty > 0;
    this.formData.set('name',form.prod_name);
    this.formData.set('cost',form.prod_cost);
    this.formData.set('availableQty',form.prod_qty);
    this.formData.set('productType',form.productType);
    this.formData.set('legal_disclaimer',form.legal_disclaimer);
    this.formData.set('safety_info',form.safety_info);
    this.formData.set('quality',form.quality);
    this.formData.set('description',form.description);
    this.formData.set('availability',form.prod_qty > 0?'true':'false');
    // let jsonBody = JSON.stringify(this.body);
    // console.log(this.body);
    this.productsService.uploadProducts(this.formData).subscribe(
      (res)=>{
        console.log(res)
        this.successMsg = "Product upload Successful!";
        this.errorMsg = "";
      this.rForm.reset();
    }, (err) => {
      this.successMsg = "";
      this.errorMsg = "Product upload Unsuccessful. Please try again with valid data!";
      console.log(err);
    }) 
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      // this.body.myFile = file;
      this.formData.set('myFile',file);
    }
  }

}
