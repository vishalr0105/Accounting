import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAndServicePageComponent } from './product-and-service-page.component';

describe('ProductAndServicePageComponent', () => {
  let component: ProductAndServicePageComponent;
  let fixture: ComponentFixture<ProductAndServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAndServicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAndServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
