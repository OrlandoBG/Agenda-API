import { Component, OnInit} from '@angular/core';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent {

  formulario!: FormGroup;
  contatos: Contato[]=[];
  colunas= ['foto', 'id', 'nome','email','favorito'];

  constructor(private service: ContatosService, private fb: FormBuilder,
              private dialog: MatDialog ){}

  ngOnInit(){
    this.montarFormulario();
    this.listarContatos();
  }

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    });
  }

  favoritar(contato: Contato){
    this.service.favorite(contato)
    .subscribe(response =>{
      contato.favorito = !contato.favorito;
    }); 
  }

  uploadFoto(event :Event, contato: any){
      const elemento = event.currentTarget as HTMLInputElement;
      let files: FileList | null = elemento.files;
      if(files){
        const foto = files[0];
        const formData: FormData = new FormData();
        formData.append("foto", foto);
        this.service.upload(contato, formData)
                    .subscribe(response =>{
                      this.listarContatos();
                    });
      }        
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
