import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { BoxComponent } from './box.component';

describe('BoxComponent', () => {
  let component: BoxComponent;
  let fixture: ComponentFixture<BoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComponent);
    component = fixture.componentInstance;
    component.info = {
      id: 2,
      value: "1",
      name: "dollar"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if no results from API', () => {
    expect(fixture.debugElement.query(By.css('.autoGrid'))).not.toBeNull();
  });

  it('Value should show with currency ', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toEqual("1 USD");
  });

});
