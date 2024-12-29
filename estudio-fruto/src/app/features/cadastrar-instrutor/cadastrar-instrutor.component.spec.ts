import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarInstrutorComponent } from './cadastrar-instrutor.component';

describe('CadastrarInstrutorComponent', () => {
  let component: CadastrarInstrutorComponent;
  let fixture: ComponentFixture<CadastrarInstrutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarInstrutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarInstrutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
