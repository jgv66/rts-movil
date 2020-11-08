import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmlPage } from './tml.page';

describe('TmlPage', () => {
  let component: TmlPage;
  let fixture: ComponentFixture<TmlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
