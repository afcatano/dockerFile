import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { User } from '../../Models/User';
import { Session } from '../../Models/session';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service'
import { StorageService } from '../../storage/storage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})

export class AuthPageComponent implements OnInit {

  username: string;
  password: string;
  processing: boolean;
  error:string;


  constructor(private servicio:AuthenticationService,private parent: AppComponent 
    ,private storageService: StorageService
    ,private router: Router) {
    this.username=null;
    this.password= null;
    this.processing = false;
    this.error = null;
  }

  ngOnInit(){
  }

 

  onSubmit() {
    if(this.username && this.password) {
      this.processing=true;
      console.log(this.username, this.password);
      this.servicio.signIn(new User(this.username, this.password)).subscribe(
        result => {
             this.processing = false;
            if(result.code==200) {
              console.log(result);
              console.log("usuario logueado "+this.username);
              this.parent.openDialog( "","Usuario  "+this.username+" autenticado !!","Informativo");
              var sessionData= new Session();
              var userData= new User(this.username, this.password);
              sessionData.user=userData;
              this.correctLogin(sessionData);
            } else {
              console.log(JSON.stringify(result, null, 4));
              this.parent.openDialog( "",result.description,"Alerta");
            }
        },
        error => {
            console.log(error);
            this.processing = false;
            this.parent.openDialog( "","Servidor no disponible","Alerta");
            
        })
    } else {
      this.parent.openDialog( "","Debe completar todos los campos","Alerta");
    }
  }
 
  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

  discardNotification(){
    this.error = null;
  }

}
