import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBarComponent } from './top-subbar.component';

describe('TestBarComponent', () => {
  let component: TestBarComponent;
  let fixture: ComponentFixture<TestBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
