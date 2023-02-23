import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { LoaderService } from 'src/app/service/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productLimit = 8;
  let pageIndex = 1;
  let product_service: ProductServiceService;
  let loader_service: LoaderService;
  let checkLoadOption = false;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductServiceService, useclass: product_service },
        { provide: LoaderService, useclass: loader_service },
        { provide: HttpClient, usevalue: httpClientSpy },
      ],
    }).compileComponents();

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    product_service = TestBed.inject(ProductServiceService);
    loader_service = TestBed.inject(LoaderService);

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be call isLoading', () => {
    loader_service.loading?.next(true);
    component.ngOnInit();
    expect(component.isLoading).toEqual(true);
  });

  it('should get user data', fakeAsync(async (done: DoneFn) => {
    let product = [
      {
        brand: 'Apple',
        category: 'smartphones',
        description: 'An apple mobile which is nothing like apple',
        discountPercentage: 12.96,
        id: 1,
        images: [
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202003/2020-iPhone-SE-2-comes-with-be.jpeg',
        ],
        price: 549,
        rating: 4.69,
        stock: 94,
        title: 'iPhone 9',
      },
    ];
    let spy = spyOn(product_service, 'getAllProduct').and.returnValue(of(product));
    component.loadUser();
    product_service.getAllProduct(productLimit, pageIndex).subscribe()
    expect(component.productList).toEqual(product);
    expect(spy).toHaveBeenCalled();
  }));
});
