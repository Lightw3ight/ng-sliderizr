import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonPanelComponent } from './anon-panel/anon-panel.component';
import { SliderizrModule } from './../sliderizr.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoDashboardComponent } from './demo-dashboard/demo-dashboard.component';
import { DemoResultsComponent } from './demo-results/demo-results.component';
import { DemoResultDetailsComponent } from './demo-results/demo-result-details/demo-result-details.component';
import { DemoRandomPanelComponent } from './demo-random-panel/demo-random-panel.component';

@NgModule({
    declarations: [
        DemoComponent,
        DemoDashboardComponent,
        DemoResultsComponent,
        DemoResultDetailsComponent,
        DemoRandomPanelComponent,
        AnonPanelComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DemoRoutingModule,
        SliderizrModule,
        BrowserAnimationsModule
    ],
    providers: [],
    entryComponents: [
        AnonPanelComponent
    ],
    bootstrap: [DemoComponent]
})
export class DemoModule { }
