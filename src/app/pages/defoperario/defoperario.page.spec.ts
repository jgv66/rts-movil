import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DefoperarioPage } from './defoperario.page';

describe('DefoperarioPage', () => {
  let component: DefoperarioPage;
  let fixture: ComponentFixture<DefoperarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefoperarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DefoperarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
