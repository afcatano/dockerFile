import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { AuthPageComponent } from './component/auth-page/auth-page.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { QualificationComponent } from './component/qualification/qualification.component';
import { OverviewComponent } from './component/overview/overview.component';
import { RatingDetailComponent } from './component/rating-detail/rating-detail.component'
import { ValidateSession } from './Services/validatesession.service'
import { UserLocalSession } from './Services/User-Local-session.service'
import { RemoveSession } from './Services/remove-session.service'
import { TracingComponent } from './component/tracing/tracing.component'
import { BehaviorComponent } from './component/behavior/behavior.component'
import { OverviewDetailComponent } from './component/overview-detail/overview-detail.component'
import { ReportComponent } from './component/report/report.component'
import { WatsonVisualComponent } from './component/watson-visual/watson-visual.component';
import { PrincipalComponent } from './component/principal/principal.component';

import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { CarritoComponent } from './component/carrito/carrito.component';
import { CotizacionesComponent } from './component/cotizaciones/cotizaciones.component';

//Constante que almacena las rutas de la app
const routes: Route[] = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: "", component: PrincipalComponent,
  children: [
    { path: 'products', component: CatalogoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'overview', component: OverviewComponent },
  ]},
 // { path: "", component: LoginComponent, canActivate: [UserLocalSession] },
  { path: "login", component: LoginComponent, canActivate: [RemoveSession] },
  {
    path: "home", component: HomeComponent, canActivate: [ValidateSession],
    children: [{ path: 'qualification', component: QualificationComponent },
    { path: 'cotizacion', component: CotizacionesComponent },
   { path: 'tracing', component: TracingComponent  },
    { path: 'qualification/ratingdetail', component: RatingDetailComponent },
    { path: 'behavior', component:BehaviorComponent },
    { path: 'report', component:ReportComponent },
    { path:'visual',component:WatsonVisualComponent }
  ]
  },
];

///Modulo encargado del enrutamiento entre componentes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
