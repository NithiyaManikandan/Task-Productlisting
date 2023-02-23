import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private service: LoaderService, private http: HttpClient) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service.loader(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.service.loader(false);
      })
    );
  }
}
