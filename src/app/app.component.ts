import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import jspreadsheet from 'jspreadsheet';
import Switch from '@lemonadejs/switch';
import 'jsuites/dist/jsuites.css';
import 'jspreadsheet/dist/jspreadsheet.css';
import '@lemonadejs/switch/dist/style.css';

// Set your JSS license key (The following key only works for one day)
jspreadsheet.setLicense(
  'MDJkZjhiMzViMmFjZGU4OGJjZjVkN2Y2N2UyY2Y2YzM5M2ViYTc2ZWVmMmRiY2E0YTFkZjA3YzgwZWQ1M2U4NmU5YjgyMGNmMWNlNTM2MTNlMWYwOTg1NDEwZjM3ZDY4YjM3ZTdiYzdiMzE3NWY4OGQ0Y2Y5MDMyNzhiNjliMjEsZXlKamJHbGxiblJKWkNJNklpSXNJbTVoYldVaU9pSktjM0J5WldGa2MyaGxaWFFpTENKa1lYUmxJam94TnpFek9UUXlNelE0TENKa2IyMWhhVzRpT2xzaWFuTndjbVZoWkhOb1pXVjBMbU52YlNJc0ltTnZaR1Z6WVc1a1ltOTRMbWx2SWl3aWFuTm9aV3hzTG01bGRDSXNJbU56WWk1aGNIQWlMQ0ozWldJaUxDSnNiMk5oYkdodmMzUWlYU3dpY0d4aGJpSTZJak0wSWl3aWMyTnZjR1VpT2xzaWRqY2lMQ0oyT0NJc0luWTVJaXdpZGpFd0lpd2lkakV4SWl3aVkyaGhjblJ6SWl3aVptOXliWE1pTENKbWIzSnRkV3hoSWl3aWNHRnljMlZ5SWl3aWNtVnVaR1Z5SWl3aVkyOXRiV1Z1ZEhNaUxDSnBiWEJ2Y25SbGNpSXNJbUpoY2lJc0luWmhiR2xrWVhScGIyNXpJaXdpYzJWaGNtTm9JaXdpY0hKcGJuUWlMQ0p6YUdWbGRITWlMQ0pqYkdsbGJuUWlMQ0p6WlhKMlpYSWlMQ0p6YUdGd1pYTWlYU3dpWkdWdGJ5STZkSEoxWlgwPQ==',
);

// Create component
@Component({
  standalone: true,
  selector: 'app-root',
  template: `<div #spreadsheet></div>`,
})
export class AppComponent {
  @ViewChild('spreadsheet', { read: ElementRef }) spreadsheet: ElementRef;

  constructor(private renderer: Renderer2) {}

  // Create a new data grid
  ngAfterViewInit() {
    let self = this;
    let clockEditor: any = (function () {
      // JSS editor
      let methods: any = {};

      methods.createCell = function (cell: any, value: any) {
        const div = self.renderer.createElement('div');

        self.renderer.appendChild(cell, div);

        Switch(div);
      };

      return methods;
    })();
    // Create spreadsheet
    jspreadsheet(this.spreadsheet.nativeElement, {
      tabs: false,
      toolbar: false,
      worksheets: [
        {
          data: [
            ['PHP', '14:00'],
            ['Javascript', '16:30'],
          ],
          columns: [
            { type: 'text', title: 'Course Title', width: 300 },
            { type: clockEditor, title: 'Time', width: 200 },
          ],
          minDimensions: [8, 8],
        },
      ],
    });
  }
}
