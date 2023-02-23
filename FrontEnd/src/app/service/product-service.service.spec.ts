import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockResponse } from './cosntant';
import { ProductServiceService } from './product-service.service';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let httpClient: HttpClient
  let productLimit = 1;
  let pageIndex = 1;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(ProductServiceService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('test', () => {
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));
    service.getAllProduct(productLimit, pageIndex).subscribe()
    expect(httpClient.get).toHaveBeenCalled()
  })
});
