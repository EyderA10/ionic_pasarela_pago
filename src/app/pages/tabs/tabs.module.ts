import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [TabsPage],
  providers: [AuthGuard, ApiAuthService, Storage]
})
export class TabsPageModule { }
