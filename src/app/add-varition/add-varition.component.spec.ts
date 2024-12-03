import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaritionComponent } from './add-varition.component';

describe('AddVaritionComponent', () => {
  let component: AddVaritionComponent;
  let fixture: ComponentFixture<AddVaritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVaritionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVaritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
