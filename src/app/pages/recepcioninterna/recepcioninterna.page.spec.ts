import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecepcioninternaPage } from './recepcioninterna.page';

describe('RecepcioninternaPage', () => {
  let component: RecepcioninternaPage;
  let fixture: ComponentFixture<RecepcioninternaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcioninternaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecepcioninternaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
