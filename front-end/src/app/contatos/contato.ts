export class Contato{
    id: number =0;
    nome: string ="";
    email: string="";
    favorito: boolean=false;
    foto: File;
    
    constructor(nome: string, email:string){
        this.nome = nome;
        this.email = email;
    }
}