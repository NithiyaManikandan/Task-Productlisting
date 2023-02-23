import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoaderService } from '../service/loader.service';
import { LoaderInterceptor } from './loader.interceptor';

describe('ProductInterceptor', () => {
  let loader_service: LoaderService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });
    loader_service = TestBed.inject(LoaderService);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created for success', () => {
    let api_url = 'https://run.mocky.io/v3/4e90724f-eafc-49d5-a1cd-290f61f1378a';
    let spy = spyOn(loader_service, 'loader').and.callThrough();
    httpClient.get(api_url, { responseType: 'text' }).subscribe();
    httpTestingController
      .expectOne(api_url)
      .flush({}, { status: 200, statusText: '' });
    httpTestingController.verify();
    expect(spy).toHaveBeenCalled();
  });
});
