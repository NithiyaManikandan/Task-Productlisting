import { TestBed } from '@angular/core/testing';
import * as Rx from 'rxjs';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let BehaviorSubject = Rx.BehaviorSubject;
  let TOAST_STATE = {
    toastMessages: 'ok',
    showToast: false,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    let spy = spyOn(service, 'showToast$').and.callThrough();
    let subject = new BehaviorSubject(TOAST_STATE);
    service.showToast$(TOAST_STATE);
    subject.next(TOAST_STATE);
    expect(subject.value).toEqual(TOAST_STATE);
  });
});
