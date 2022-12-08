import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListAltComponent } from './product-list-alt.component';

describe('ProductListAltComponent', () => {
  let component: ProductListAltComponent;
  let fixture: ComponentFixture<ProductListAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListAltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
