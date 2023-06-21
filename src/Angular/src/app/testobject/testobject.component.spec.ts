import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestobjectComponent } from './testobject.component';

describe('TestobjectComponent', () => {
  let component: TestobjectComponent;
  let fixture: ComponentFixture<TestobjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestobjectComponent]
    });
    fixture = TestBed.createComponent(TestobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
