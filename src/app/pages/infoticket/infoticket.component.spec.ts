import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoticketComponent } from './infoticket.component';

describe('InfoticketComponent', () => {
  let component: InfoticketComponent;
  let fixture: ComponentFixture<InfoticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
