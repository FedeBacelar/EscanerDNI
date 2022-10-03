import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDNIComponent } from './mostrar-dni.component';

describe('MostrarDNIComponent', () => {
  let component: MostrarDNIComponent;
  let fixture: ComponentFixture<MostrarDNIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarDNIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarDNIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
