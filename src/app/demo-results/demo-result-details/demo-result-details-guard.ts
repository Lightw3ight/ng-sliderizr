import { BehaviorSubject } from 'rxjs';
import { DemoResultDetailsComponent } from './demo-result-details.component';

import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoResultDetailsGuardGuard implements CanDeactivate<DemoResultDetailsComponent> {
    public canDeactivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (window.confirm('u sure dog?')) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
}
