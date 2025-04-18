import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMatchingComponent } from './friend-matching.component';

describe('FriendMatchingComponent', () => {
  let component: FriendMatchingComponent;
  let fixture: ComponentFixture<FriendMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendMatchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
