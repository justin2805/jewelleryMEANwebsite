import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Products } from './../../Entities/Products.entities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  rForm: FormGroup;
  form: any;
  body: Products = new Products();
  id: number = null;
  originalProdVal: Products = new Products();
  private errorMsg: string = "";
  private successMsg: string = "";
  private formData: FormData = new FormData();


  constructor(private fb: FormBuilder,
    private productsservice: ProductsService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {
    this.rForm = fb.group({
      'prod_name': [null, Validators.required],
      'prod_cost': [null, Validators.required],
      'prod_qty': [null, Validators.required],
      'productType': [null, Validators.required],
      'legal_disclaimer': [null],
      'safety_info': [null],
      'quality': [null],
      'availability': [null],
      'description': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('prod_id');
      console.log(this.id)
    })

    if (this.id != null) {
      this.productsservice.getSingleProduct(this.id).subscribe((res) => {
        this.originalProdVal = res;
        this.rForm.controls['prod_name'].setValue(this.originalProdVal.name);
        this.rForm.controls['prod_cost'].setValue(this.originalProdVal.cost);
        this.rForm.controls['productType'].setValue(this.originalProdVal.productType);
        this.rForm.controls['description'].setValue(this.originalProdVal.description);
        this.rForm.controls['quality'].setValue(this.originalProdVal.quality);
        this.rForm.controls['safety_info'].setValue(this.originalProdVal.safety_info);
        this.rForm.controls['legal_disclaimer'].setValue(this.originalProdVal.legal_disclaimer);

      })
    }
  }


  onSubmit(form) {
    // this.body.name = form.prod_name;
    // this.body.cost = form.prod_cost;
    // this.body.availableQty = form.prod_qty;
    // this.body.productType = form.productType;
    // this.body.legal_disclaimer = form.legal_disclaimer;
    // this.body.safety_info = form.safety_info;
    // this.body.quality = form.quality;
    // this.body. = form.description;
    // this.body.availability = form.prod_qty > 0;
    this.formData.set('name', form.prod_name);
    this.formData.set('cost', form.prod_cost);
    this.formData.set('availableQty', form.prod_qty);
    this.formData.set('productType', form.productType);
    this.formData.set('legal_disclaimer', form.legal_disclaimer);
    this.formData.set('safety_info', form.safety_info);
    this.formData.set('quality', form.quality);
    this.formData.set('description', form.description);
    this.formData.set('availability', form.prod_qty > 0 ? 'true' : 'false');
    // let jsonBody = JSON.stringify(this.body);
    // console.log(this.body);
    this.productsservice.updateProducts(this.formData,this.id).subscribe(
      (res) => {
        this.successMsg = "Product upload Successful!";
        this.errorMsg = "";
        this.rForm.reset();
      }, (err) => {
        this.successMsg = "";
        this.errorMsg = "Product upload Unsuccessful. Please try again with valid data!";
        console.log(err);
      })
  }

  delete() {
    this.productsservice.deleteProducts(this.id).subscribe(
      (res) => {
        console.log(res)
        this.successMsg = "Product delete Successful!";
        this.errorMsg = "";
        this.rForm.reset();
      }, (err) => {
        this.successMsg = "";
        this.errorMsg = "Product delete Unsuccessful. Please try again later!";
        console.log(err);
      })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      // this.body.myFile = file;
      this.formData.set('myFile', file);
    }
  }
}

