import {
    Component,
    ElementRef,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';
import jspreadsheet from 'jspreadsheet';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import 'jsuites/dist/jsuites.css';
import 'jspreadsheet/dist/jspreadsheet.css';

// Set your JSS license key (The following key only works for one day)
jspreadsheet.setLicense(
    'MDJkZjhiMzViMmFjZGU4OGJjZjVkN2Y2N2UyY2Y2YzM5M2ViYTc2ZWVmMmRiY2E0YTFkZjA3YzgwZWQ1M2U4NmU5YjgyMGNmMWNlNTM2MTNlMWYwOTg1NDEwZjM3ZDY4YjM3ZTdiYzdiMzE3NWY4OGQ0Y2Y5MDMyNzhiNjliMjEsZXlKamJHbGxiblJKWkNJNklpSXNJbTVoYldVaU9pSktjM0J5WldGa2MyaGxaWFFpTENKa1lYUmxJam94TnpFek9UUXlNelE0TENKa2IyMWhhVzRpT2xzaWFuTndjbVZoWkhOb1pXVjBMbU52YlNJc0ltTnZaR1Z6WVc1a1ltOTRMbWx2SWl3aWFuTm9aV3hzTG01bGRDSXNJbU56WWk1aGNIQWlMQ0ozWldJaUxDSnNiMk5oYkdodmMzUWlYU3dpY0d4aGJpSTZJak0wSWl3aWMyTnZjR1VpT2xzaWRqY2lMQ0oyT0NJc0luWTVJaXdpZGpFd0lpd2lkakV4SWl3aVkyaGhjblJ6SWl3aVptOXliWE1pTENKbWIzSnRkV3hoSWl3aWNHRnljMlZ5SWl3aWNtVnVaR1Z5SWl3aVkyOXRiV1Z1ZEhNaUxDSnBiWEJ2Y25SbGNpSXNJbUpoY2lJc0luWmhiR2xrWVhScGIyNXpJaXdpYzJWaGNtTm9JaXdpY0hKcGJuUWlMQ0p6YUdWbGRITWlMQ0pqYkdsbGJuUWlMQ0p6WlhKMlpYSWlMQ0p6YUdGd1pYTWlYU3dpWkdWdGJ5STZkSEoxWlgwPQ=='

// Create component
@Component({
    standalone: true,
    selector: 'app-root',
    imports: [MatSlideToggle],
    template: `<div>
    <div #spreadsheet></div>
    <div #dynamicComponentContainer></div>
  </div>`,
})
export class AppComponent {
    @ViewChild('spreadsheet', { read: ElementRef }) spreadsheet: ElementRef;
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver) {}

    // Create a new data grid
    ngAfterViewInit() {
        let self = this;
        
        let clockEditor: any = (function () {
            // JSS editor
            let methods: any = {};

            methods.createCell = function (cell: any, value: any) {
                const factory = self.resolver.resolveComponentFactory(MatSlideToggle)

                const dynamicComponent = self.container.createComponent(factory);

                cell.appendChild(dynamicComponent.location.nativeElement)
            };
            return methods;
        })();

        // Create spreadsheet
        jspreadsheet(this.spreadsheet.nativeElement, {
            tabs: false,
            toolbar: false,
            worksheets: [
                {
                    columns: [
                        { type: clockEditor, width: 100 },
                    ],
                    minDimensions: [8, 8],
                },
            ],
        });
    }
}
