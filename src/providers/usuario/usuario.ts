import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  public usuarioLogado: object = null;
  private path: string = "http://localhost:8080/usuario";
  private mock:boolean = true;

 
   constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');    
  }

  cadastrarUsuarioCliente(usuario:any):Promise<object>{
    if(!this.mock){
      return this.http.post(this.path, 
        {
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.tel,  
          endereco: usuario.endereco,
          senha: usuario.senha
        }).toPromise(); 
    }
    return this.http.get("assets/mock/usuario.json").toPromise();
  }

  loginUsuario(usuario:any):Promise<any>{
    
    if(!this.mock){
      return this.http.post<any>(this.path + "/login", {
        email: usuario.email,
        senha: usuario.senha
      }).toPromise().then((res)=>{
        if(res){
          return true;
        }
        return;
      }).catch((err)=>{
        console.error(err);        
      });
    }else{
      return this.http.get<any>("assets/mock/usuario.json").toPromise().then((res)=>{
        console.log(res[0].email);
        if(res[0].email === usuario.email && res[0].senha === usuario.senha){
          this.usuarioLogado = res[0];
          return true;
        }
        return;
      }).catch((err)=>{
        console.error(err);        
      });
    }
  }

  logout(){
    this.usuarioLogado = null;
  }


}
