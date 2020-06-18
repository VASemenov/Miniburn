import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPadComponent } from './menu-pad.component';

describe('MenuPadComponent', () => {
  let component: MenuPadComponent;
  let fixture: ComponentFixture<MenuPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
