import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ParameterInfo} from "../ParameterInfo";

@Injectable({
  providedIn: 'root'
})
//Servicio encargado de consultar la autenticacion del usuario
export class AuthenticationService {

  private authAPI:string;

  constructor(private http:HttpClient) {
    this.authAPI = "/api/autorization/autorization";
  }

  signIn(user): Observable<any> {
    var parameterInfo = new ParameterInfo();
    return this.http.post((parameterInfo.isLocal ? parameterInfo.pathApis: "" )+this.authAPI, user.toJSON());
  }

}
