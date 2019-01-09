import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideNavClose = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onSideNavClose() {
    this.sideNavClose.emit();
  }

}
