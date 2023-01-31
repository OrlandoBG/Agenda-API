import { Component, OnInit} from '@angular/core';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent {

  constructor(private service: ContatosService){

  }

  ngOnInit(){
    
  }


}
