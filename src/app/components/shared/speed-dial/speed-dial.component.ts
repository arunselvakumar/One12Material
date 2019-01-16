import {Component, OnInit} from '@angular/core';
import {speedDialFabAnimations} from './speed-dial.animations';
import {UploadMemeComponent} from '../../main/dialogs/upload-meme/upload-meme.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialComponent implements OnInit {

  fabButtons = [
    {
      icon: 'timeline',
      toolTip: 'timeline tooltip'
    },
    {
      icon: 'view_headline',
      toolTip: 'timeline tooltip'
    },
    {
      icon: 'room',
      toolTip: 'timeline tooltip'
    },
    {
      icon: 'lightbulb_outline',
      toolTip: 'timeline tooltip'
    },
    {
      icon: 'wallpaper',
      toolTip: 'Upload Story',
      context: 'upload_story'
    }
  ];

  buttons = [];

  fabTogglerState = 'inactive';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  onButtonClick(context: string) {
    if (context === 'upload_story') {
      this.hideItems();

      const dialogRef = this.dialog.open(UploadMemeComponent, {
        height: 'auto',
        width: '800px',
      });
    }
  }

}
