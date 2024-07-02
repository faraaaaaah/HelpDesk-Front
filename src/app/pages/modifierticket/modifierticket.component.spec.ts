import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierticketComponent } from './modifierticket.component';

describe('ModifierticketComponent', () => {
  let component: ModifierticketComponent;
  let fixture: ComponentFixture<ModifierticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
