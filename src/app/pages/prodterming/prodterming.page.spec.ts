import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdtermingPage } from './prodterming.page';

describe('ProdtermingPage', () => {
  let component: ProdtermingPage;
  let fixture: ComponentFixture<ProdtermingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdtermingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdtermingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
