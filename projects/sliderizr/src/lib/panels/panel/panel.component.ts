import { BasePanel } from '../base-panel';
import { SzPanelHostComponent } from './../../panel-host/panel-host.component';
import { ChildPanelHostDirective } from './../../child-panel-host/child-panel-host.directive';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    Component,
    ElementRef,
    EventEmitter,
    Injector,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PANEL_ROUTE_ANIMATION } from '../../core/animations/panel-route.animation';
import { SzActivePanel } from '../../core/panel/active-panel';
import { SzPanelService } from '../../core/panel/panel.service';
import { ComponentType } from '../../core/generic-component-type';

@Component({
    selector: 'sz-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    animations: [
        PANEL_ROUTE_ANIMATION
    ],
    encapsulation: ViewEncapsulation.None
})
export class SzPanelComponent extends BasePanel implements OnInit, OnDestroy {
    private _activeAnon: SzActivePanel<any>;
    private _destroyed$: Subject<any> = new Subject<any>();
    @ViewChild(ChildPanelHostDirective, { static: true }) childPanelHost: ChildPanelHostDirective;
    @ViewChild(RouterOutlet, { static: true }) private _childOutlet: RouterOutlet;
    @Output() afterChildClosed = new EventEmitter<any>();
    @Output() afterChildOpened = new EventEmitter<any>();

    public get childComponent(): Object {
        return this._childOutlet.component;
    }

    constructor (
        @Optional() parent: SzPanelHostComponent,
        private _panelService: SzPanelService,
        injector: Injector,
        element: ElementRef,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        super(parent, element, injector);
    }


    ngOnInit() {
        this._canClose = this._route.root !== this._route.parent;

        this._route.params.pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe(() => {
                this._parent.setActivePanel(this, true);
            });
    }

    /**
     * Open an anonymous panel
     * @param content The component representing the anon panel
     */
    public openChild<T>(content: ComponentType<T>): SzActivePanel<T> {
        if (this._childOutlet.isActivated) {
            this.closeChildRoute();
        }

        this._activeAnon = this._panelService.open<T>(content, this, this._injector);

        this._activeAnon.afterClosed
            .subscribe(() => {
                this._parent.setActivePanel(this);
                this._activeAnon = null;
            });

        this._parent.setActivePanel(this._activeAnon.componentInstance);

        return this._activeAnon;
    }

    /**
     * Close the panel
     * This routes to the parent panel
     */
    public close() {
        this._router.navigate(['./'], { relativeTo: this._route.parent });
    }

    /**
     * Closes all child panels
     * Essentially this routes to the current panel
     */
    public closeChildRoute() {
        this._router.navigate(['./'], { relativeTo: this._route });
    }

    public ngOnDestroy() {
        this._destroyed$.next();
    }

    /**
     * Event handler for when the router outlet deactivates
     * @param component The component that was deactivated
     */
    public onChildDeactivate(component: any) {
        this._parent.setActivePanel(this);
        this.afterChildClosed.emit(component);
    }

    /**
     * Event handler for when the router outlet activates
     * @param component The component that the outlet was activated with
     */
    public onChildActivate(component: any) {
        this.afterChildOpened.emit(component);
        if (this._activeAnon) {
            this._activeAnon.close();
        }
    }
}
