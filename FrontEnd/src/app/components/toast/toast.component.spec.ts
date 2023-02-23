import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ToastService } from 'src/app/service/toast.service';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let toast_service: ToastService;
  let fixture: ComponentFixture<ToastComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers:[
        { provide: ToastService, useclass: toast_service }
      ]
    }).compileComponents();
    toast_service = TestBed.inject(ToastService);

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get toast Meassage', () => {
    toast_service.toastMessage.next({
      toastMessages: 'ok',
      showToast: true,
    });
    component.ngOnInit();
    expect(component.toastState).toEqual('ok');
    expect(component.showToast).toEqual(true);
  });

  it('should call dimisstoast', fakeAsync(() => {
    let spy = spyOn(toast_service, 'dismissToast').and.callThrough();
    toast_service.toastMessage.next({
      toastMessages: 'ok',
      showToast: false,
    });
    component.dismissError();
    tick(2000);
    toast_service.dismissToast();
    expect(toast_service.dismissToast).toHaveBeenCalled();
    expect(component.showToast).toEqual(false);
  }));
});
