import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefunddetailsComponent } from './refunddetails.component';

describe('RefunddetailsComponent', () => {
  let component: RefunddetailsComponent;
  let fixture: ComponentFixture<RefunddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefunddetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefunddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
