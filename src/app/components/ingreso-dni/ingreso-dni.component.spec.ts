import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoDNIComponent } from './ingreso-dni.component';

describe('IngresoDNIComponent', () => {
  let component: IngresoDNIComponent;
  let fixture: ComponentFixture<IngresoDNIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoDNIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoDNIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
