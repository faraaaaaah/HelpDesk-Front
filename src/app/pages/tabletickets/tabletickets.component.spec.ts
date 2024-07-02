/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableticketsComponent } from './tabletickets.component';

describe('TableticketsComponent', () => {
  let component: TableticketsComponent;
  let fixture: ComponentFixture<TableticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableticketsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
