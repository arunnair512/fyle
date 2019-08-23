import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { CityItemComponent } from '../../components/city-item/city-item.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [
        HomePage,
        EmptyStateComponent,
        CityItemComponent,
        ProgressBarComponent,
    ]
})
export class HomePageModule {}
