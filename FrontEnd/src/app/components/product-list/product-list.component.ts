import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  pageIndex: number = 0;
  productLimit = 8;
  productList: any;
  checkLoadOption: boolean = true;
  isLoading: boolean = false

  constructor(
    private productService: ProductServiceService,
    private loaderService: LoaderService,
  ) {
    this.pageIndex = 1;
  }

  ngOnInit(): void {
    this.loaderService.loading.subscribe((res) => {
      this.isLoading = res;
    });
    this.loadUser();
  }

  loadUser() {
    this.productService
      .getAllProduct(this.productLimit, this.pageIndex)
      .pipe(
        tap({
          error: () => {
            this.checkLoadOption = false;
          }
        })
      )
      .subscribe((res: any) => {
        this.productList = res;
        if (this.productList.length / this.productLimit < this.pageIndex) {
          this.checkLoadOption = false;
        }
        this.pageIndex += 1;
      });
  }
}
