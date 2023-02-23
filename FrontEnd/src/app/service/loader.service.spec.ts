import { TestBed } from '@angular/core/testing';
import * as Rx from 'rxjs';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;
  let BehaviorSubject = Rx.BehaviorSubject;
  let loading : false
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    let spy = spyOn(service, 'loader').and.callThrough();
    let subject = new BehaviorSubject(false);
    service.loader(loading)
    subject.next(true);
    expect(subject.value).toEqual(true)
  });
});
