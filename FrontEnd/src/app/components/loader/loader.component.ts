import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading!: boolean;
  constructor(private loadingSerivce: LoaderService) {}

  ngOnInit(): void {
    this.loadingSerivce.loading.subscribe((res) => {
      this.isLoading = res;
    });
  }
}
