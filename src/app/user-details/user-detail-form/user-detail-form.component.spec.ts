import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailFormComponent } from './user-detail-form.component';

describe('UserDetailFormComponent', () => {
  let component: UserDetailFormComponent;
  let fixture: ComponentFixture<UserDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
