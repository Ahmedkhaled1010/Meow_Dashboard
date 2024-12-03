import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrefundComponent } from './allrefund.component';

describe('AllrefundComponent', () => {
  let component: AllrefundComponent;
  let fixture: ComponentFixture<AllrefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllrefundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllrefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
