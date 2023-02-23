import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../service/loader.service';
import { BehaviorSubject, Observable } from 'rxjs';
describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loader_service: Partial<LoaderService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        { provide: LoaderService, useclass: loader_service },
      ],
    }).compileComponents();

    loader_service = TestBed.inject(LoaderService);
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('isloading', () => {
    loader_service.loading?.next(true);
    component.ngOnInit();
    expect(component.isLoading).toEqual(true);
  });
});
