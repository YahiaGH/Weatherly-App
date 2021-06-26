import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamMenuComponent } from './ham-menu.component';

describe('HamMenuComponent', () => {
  let component: HamMenuComponent;
  let fixture: ComponentFixture<HamMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HamMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
