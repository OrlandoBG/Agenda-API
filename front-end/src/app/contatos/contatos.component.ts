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

  constructor(private service: ContatosService, private fb: FormBuilder){

  }

  ngOnInit(){
    this.formulario = this.fb.group({
      nome: [''],
      email: ['']
    })
  }


  submit(){

    const formValues = this.formulario.value;
    const contato = new Contato(formValues.nome, formValues.email);
    this.service.salvar(contato)
                .subscribe(response =>{
                    this.contatos.push(response);
                    console.log(this.contatos);
                })
    
  }


}
