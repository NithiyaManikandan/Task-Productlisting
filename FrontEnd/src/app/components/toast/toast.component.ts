import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ToastService } from 'src/app/service/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  [x: string]: any;
  toastState!: any;
  showToast !: boolean
  constructor(private service: ToastService) {}

  ngOnInit(): void {
    this.service.toastMessage.subscribe((res) => {
      this.toastState = res.toastMessages;
      this.showToast = res.showToast
    });
    this.dismissError();
  }

  dismissError(): void {
    setTimeout(() => {
      this.service.dismissToast();
    }, 2000);
  }
}
