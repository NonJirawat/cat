import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertfromComponent } from './insertfrom.component';

describe('InsertfromComponent', () => {
  let component: InsertfromComponent;
  let fixture: ComponentFixture<InsertfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertfromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
