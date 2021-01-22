import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

import {ShellComponent} from './shell.component';
import {DebugElement} from '@angular/core';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let de: DebugElement;
  let header: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShellComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    header = fixture.nativeElement.querySelector('span');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Booktique text', () => {
    expect(header.textContent).toEqual('Booktique');
  });
});
