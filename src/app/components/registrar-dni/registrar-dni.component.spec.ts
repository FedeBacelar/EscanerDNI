import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDNIComponent } from './registrar-dni.component';

describe('RegistrarDNIComponent', () => {
  let component: RegistrarDNIComponent;
  let fixture: ComponentFixture<RegistrarDNIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDNIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDNIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
