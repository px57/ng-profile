import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrgpasswordChangePasswordComponent } from './frgpassword-change-password.component';

describe('FrgpasswordChangePasswordComponent', () => {
  let component: FrgpasswordChangePasswordComponent;
  let fixture: ComponentFixture<FrgpasswordChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrgpasswordChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrgpasswordChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
