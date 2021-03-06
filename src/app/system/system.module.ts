import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/components/directives/dropdown.directive';


const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'planning', component: PlanningPageComponent},
      {path: 'records', component: RecordsPageComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [SystemComponent, BillPageComponent, HistoryPageComponent, PlanningPageComponent, RecordsPageComponent, SidebarComponent, HeaderComponent, DropdownDirective]
})
export class SystemModule {
}
