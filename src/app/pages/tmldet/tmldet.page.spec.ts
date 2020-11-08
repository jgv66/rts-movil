import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmldetPage } from './tmldet.page';

describe('TmldetPage', () => {
  let component: TmldetPage;
  let fixture: ComponentFixture<TmldetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmldetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmldetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
