import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/_guard/auth.guard';

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


const routes: Routes = [
  {path:'',component:SigninComponent ,canActivate: [AuthGuard] },
  {path:'signin',component:SigninComponent ,canActivate: [AuthGuard] },
  {path:'change-password',component:ChangepasswordComponent ,canActivate: [AuthGuard] },
  {path:'dashboard',component:DashboardComponent ,canActivate: [AuthGuard] },
  {path:'management-listing',component:UserListComponent ,canActivate: [AuthGuard] },
  {path:'vendor-listing',component:UserListComponent ,canActivate: [AuthGuard] },
  {path:'tenant-listing',component:UserListComponent ,canActivate: [AuthGuard] },
  {path:'user-listing',component:UserListComponent ,canActivate: [AuthGuard] },
  {path:'profile',component:ProfileComponent ,canActivate: [AuthGuard] }, 
  {path:'static-page',component:StaticListComponent ,canActivate: [AuthGuard] }, 
  {path:'update-static',component:StaticEditComponent ,canActivate: [AuthGuard] },
  {path:'report',component:ReportComponent ,canActivate: [AuthGuard] },
  {path:'bidding',component:BidComponent ,canActivate: [AuthGuard] },
  {path:'bid-detail',component:BidDetailComponent ,canActivate: [AuthGuard] },
  {path:'services',component:CategoryComponent ,canActivate: [AuthGuard] }, 
  {path:'services-add',component:CategoryAddEditComponent ,canActivate: [AuthGuard] },
  {path:'services-edit',component:CategoryAddEditComponent ,canActivate: [AuthGuard] },
  {path:'property',component:PropertyComponent ,canActivate: [AuthGuard] },
  {path:'property-detail',component:PropertyDetailComponent ,canActivate: [AuthGuard] },
  {path:'building',component:BuildingListComponent ,canActivate: [AuthGuard] },
  {path:'building-add',component:BuildingAddEditComponent ,canActivate: [AuthGuard] },
  {path:'building-edit',component:BuildingAddEditComponent ,canActivate: [AuthGuard] },
  {path:'category',component:SubCtegoryComponent ,canActivate: [AuthGuard] }, 
  {path:'category-add',component:SubCtegoryaddEditComponent ,canActivate: [AuthGuard] },
  {path:'category-edit',component:SubCtegoryaddEditComponent ,canActivate: [AuthGuard] },
  {path:'sub-category',component:SubCtegoryComponent ,canActivate: [AuthGuard] }, 
  {path:'sub-category-add',component:SubCtegoryaddEditComponent ,canActivate: [AuthGuard] },
  {path:'sub-category-edit',component:SubCtegoryaddEditComponent ,canActivate: [AuthGuard] },
  {path:'amenities',component:AminitiesComponent ,canActivate: [AuthGuard] },
  {path:'amenities-add',component:AminitiesAddEditComponent ,canActivate: [AuthGuard] },
  {path:'amenities-edit',component:AminitiesAddEditComponent ,canActivate: [AuthGuard] },
  {path:'ticket',component:TicketComponent ,canActivate: [AuthGuard] },
  {path:'ticket-detail',component:TicketDEtailComponent ,canActivate: [AuthGuard] },
  {path:'visitors',component:VisitorComponent ,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
