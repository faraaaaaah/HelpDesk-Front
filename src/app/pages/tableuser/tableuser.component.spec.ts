/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableuserComponent } from './tableuser.component';

describe('TableuserComponent', () => {
  let component: TableuserComponent;
  let fixture: ComponentFixture<TableuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableuserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
