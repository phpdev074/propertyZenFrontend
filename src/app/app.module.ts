import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxLoadingModule } from "ngx-loading";
import { CKEditorModule } from 'ng2-ckeditor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TruncatePipe } from "./pipe/truncate.pipe";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { ChangepasswordComponent } from './Auth/changepassword/changepassword.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { UserListComponent } from './Pages/user-list/user-list.component';
import { StaticListComponent } from './Pages/static-list/static-list.component';
import { StaticEditComponent } from './Pages/static-edit/static-edit.component';
import { ReportComponent } from './Pages/report/report.component';
import { PropertyComponent } from './Pages/property/property.component';
import { TicketComponent } from './Pages/ticket/ticket.component';
import { BidComponent } from './Pages/bid/bid.component';
import { CategoryComponent } from './Pages/category/category.component';
import { CategoryAddEditComponent } from './Pages/category-add-edit/category-add-edit.component';
import { PropertyDetailComponent } from './Pages/property-detail/property-detail.component';
import { BuildingListComponent } from './Pages/building-list/building-list.component';
import { BuildingAddEditComponent } from './Pages/building-add-edit/building-add-edit.component';
import { SubCtegoryComponent } from './Pages/sub-ctegory/sub-ctegory.component';
import { SubCtegoryaddEditComponent } from './Pages/sub-ctegoryadd-edit/sub-ctegoryadd-edit.component';
import { AminitiesComponent } from './Pages/aminities/aminities.component';
import { AminitiesAddEditComponent } from './Pages/aminities-add-edit/aminities-add-edit.component';
import { TicketDEtailComponent } from './Pages/ticket-detail/ticket-detail.component';
import { BidDetailComponent } from './Pages/bid-detail/bid-detail.component';
import { VisitorComponent } from './Pages/visitor/visitor.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SigninComponent,
    ChangepasswordComponent,
    DashboardComponent,
    ProfileComponent,
    UserListComponent,
    StaticListComponent,
    StaticEditComponent,
    ReportComponent,
    PropertyComponent,
    TicketComponent,
    BidComponent,
    CategoryComponent,
    CategoryAddEditComponent,
    PropertyDetailComponent,
    BuildingListComponent,
    BuildingAddEditComponent,
    SubCtegoryComponent,
    SubCtegoryaddEditComponent,
    AminitiesComponent,
    AminitiesAddEditComponent,
    TicketDEtailComponent,
    BidDetailComponent,
    VisitorComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
