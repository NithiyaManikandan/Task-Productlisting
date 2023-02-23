import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface TOAST_STATE {
  toastMessages: string;
  showToast: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastMessage: BehaviorSubject<TOAST_STATE> = new BehaviorSubject<TOAST_STATE>(
    {
      toastMessages: '',
      showToast: false,
    }
  );
  constructor() {}

  showToast$(message: any) {
    if (message) {
      this.toastMessage.next({
        toastMessages: message,
        showToast: true,
      });
    }
  }
  dismissToast() {
    this.toastMessage.next({
      toastMessages: '',
      showToast: false,
    });
  }
}
