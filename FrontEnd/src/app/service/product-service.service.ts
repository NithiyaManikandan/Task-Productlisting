import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}
  getAllProduct(productLimit: number, pageIndex: number) {
    return this.http
      .get(`https://run.mocky.io/v3/4e90724f-eafc-49d5-a1cd-290f61f1378a`)
      .pipe(
        map((res: any) => {
          const filteredProducts: any[] = [];
          res.products.filter((data: any) => {
            if (filteredProducts.length < productLimit * pageIndex) {
              filteredProducts.push(data);
            }
          }
        );
          return filteredProducts;
        })
      );
  }
}
