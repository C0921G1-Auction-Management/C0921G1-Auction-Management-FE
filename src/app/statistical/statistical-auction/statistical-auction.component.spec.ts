import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalAuctionComponent } from './statistical-auction.component';

describe('StatisticalAuctionComponent', () => {
  let component: StatisticalAuctionComponent;
  let fixture: ComponentFixture<StatisticalAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
