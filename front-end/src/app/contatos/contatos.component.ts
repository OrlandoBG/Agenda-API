import { Component, OnInit} from '@angular/core';
import { ContatosService } from '../contatos.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent {

  formulario!: FormGroup;
  errors: string[] = [];
  contatos: Contato[]=[];
  colunas= ['foto', 'id', 'nome','email','favorito'];

  totalElementos: number = 0;
  pagina: number = 0;
  tamanho: number = 10;
  pageSizeOptions: number[] = [10];

  constructor(private service: ContatosService, private fb: FormBuilder,
              private dialog: MatDialog, private snackBar: MatSnackBar ){}

  ngOnInit(){
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);
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
                      this.listarContatos(this.pagina, this.tamanho);
                    });
      }        
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos(pagina: number, tamanho:number){
    this.service.list(pagina, tamanho).subscribe(response =>{
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
  }

  invalidControls(formulario: FormGroup) {
    const invalid = [];
    const controls = formulario.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
}


  submit(){
    this.errors = [];
    const formValues = this.formulario.value;
    this.errors = this.invalidControls(this.formulario);
    if(this.errors.length < 1){
      const contato = new Contato(formValues.nome, formValues.email);
      this.service.salvar(contato)
                  .subscribe(response =>{
                      this.listarContatos(this.pagina,this.tamanho);
                      this.snackBar.open('Contato adicionado!', 'Sucesso!',{
                        duration: 2000
                      });
                      this.formulario.reset();
                  });
    }
  }


}
