import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSpinKitModule } from 'ng-spin-kit';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng6O2ChartModule } from 'ng6-o2-chart'; 
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';


//Librerias de angular material
import {

  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';


//Components
import { AppComponent } from './app.component';
import { AuthPageComponent } from './component/auth-page/auth-page.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { MessageComponent } from './component/message/message.component';
import { LinearGraphComponent } from './component/linear-graph/linear-graph.component';
import { QualificationComponent } from './component/qualification/qualification.component';
import { PieGraphComponent } from './component/pie-graph/pie-graph.component';
import { OverviewComponent } from './component/overview/overview.component';
import { DateFilterComponent } from './component/date-filter/date-filter.component';
import { ExcelComponent } from './component/excel/excel.component';
import { Safe } from './pipe/sanitizer.pipe'
import { ReplacePipe } from './pipe/replace.pipe'

//servicios
import {StorageService} from "./storage/storage.service";
import {StorageConfigService} from "./storage/storage-config.Service";
import {StorageParamsService} from "./storage/storage-params.service";
import {AuthenticationService} from './Services/authentication.service';
import {ValidateSession} from './Services/validatesession.service';
import {UserLocalSession} from './Services/User-Local-session.service';
import {RemoveSession} from './Services/remove-session.service';
import {StorageSelectedBotService} from './storage/storage.selectedbot';
import { RatingDetailComponent } from './component/rating-detail/rating-detail.component';
import { TableComponent } from './component/table/table.component';
import { TracingComponent } from './component/tracing/tracing.component';
import { DataFilterComponent } from './component/data-filter/data-filter.component';
import { AccordionComponent } from './component/accordion/accordion.component';
import { BehaviorComponent } from './component/behavior/behavior.component';
import { BehaviorTreeComponent } from './component/behavior-tree/behavior-tree.component';
import { OverviewDetailComponent } from './component/overview-detail/overview-detail.component';
import { ReportComponent } from './component/report/report.component';
import { WatsonVisualComponent } from './component/watson-visual/watson-visual.component';
import { PrincipalComponent } from './component/principal/principal.component';

import { CatalogoComponent } from './component/catalogo/catalogo.component';
import{StorageCarritoService}from './storage/Storage-carrito.service';
import { CarritoComponent } from './component/carrito/carrito.component';
import { CotizacionesComponent } from './component/cotizaciones/cotizaciones.component';
import {StorageCotizacionService} from './storage/Storage-cotizacion.service';
//Export de librerias de angular material
@NgModule({
  exports: [
   // CdkTableModule,
    //CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: [],
})
export class MaterialModule {}


@NgModule({
  declarations: [
    AppComponent,LoginComponent, HomeComponent, AuthPageComponent,MessageComponent,
    HeaderComponent,LinearGraphComponent,QualificationComponent,PieGraphComponent, OverviewComponent,DateFilterComponent,
    ExcelComponent, RatingDetailComponent, TableComponent, TracingComponent, DataFilterComponent, AccordionComponent, Safe,CarritoComponent,CotizacionesComponent,
    BehaviorComponent, BehaviorTreeComponent, ReplacePipe, OverviewDetailComponent, ReportComponent,WatsonVisualComponent,PrincipalComponent,CatalogoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    //Angular material iniciio
    MaterialModule, 
    BrowserAnimationsModule,
    //Angular material fin
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    NgSpinKitModule,
    Ng6O2ChartModule   ,
    ChartsModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],    
  ],
  entryComponents: [ MessageComponent],
  providers: [AuthenticationService,StorageService, StorageCotizacionService, StorageCarritoService, ValidateSession,StorageSelectedBotService, StorageParamsService, StorageConfigService,UserLocalSession,RemoveSession],
  bootstrap: [AppComponent]
})
export class AppModule { }


//platformBrowserDynamic().bootstrapModule(AppModule);