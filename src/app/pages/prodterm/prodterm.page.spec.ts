import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdtermPage } from './prodterm.page';

describe('ProdtermPage', () => {
  let component: ProdtermPage;
  let fixture: ComponentFixture<ProdtermPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdtermPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdtermPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
