import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '../service/toast.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { ToasterInterceptor } from './toaster.interceptor';

describe('ToasterInterceptor', () => {
  let toaster_service: ToastService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ToasterInterceptor,
          multi: true,
        },
      ],
    });
    toaster_service = TestBed.inject(ToastService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get toast message', () => {
    let api_url = 'https://run.mocky.io/v3/4e90724f-eafc-49d5-a1cd-290f61f1378a';
    let spy = spyOn(toaster_service, 'showToast$').and.callThrough();
    httpClient.get(api_url, { responseType: 'text' }).subscribe();
    expect(spy).toHaveBeenCalled();
  });
});
