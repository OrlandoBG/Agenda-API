import { Component, OnInit} from '@angular/core';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent {

  formulario!: FormGroup;
  contatos: Contato[]=[];
  colunas= ['id', 'nome','email','favorito'];

  constructor(private service: ContatosService, private fb: FormBuilder){

  }

  ngOnInit(){
    this.montarFormulario();
    this.listarContatos();
  }

  favoritar(contato: Contato){
    this.service.favorite(contato)
    .subscribe(response =>{
      contato.favorito = !contato.favorito;
    });
    
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: [''],
      email: ['']
    });
  }

  listarContatos(){
    this.service.list().subscribe(response =>{
      this.contatos = response;
    });
  }


  submit(){

    const formValues = this.formulario.value;
    const contato = new Contato(formValues.nome, formValues.email);
    this.service.salvar(contato)
                .subscribe(response =>{
                  let lista: Contato[] = [...this.contatos, response] 
                    this.contatos = lista;
                })
    
  }


}
