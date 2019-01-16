import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Tag {
  name: string;
}

@Component({
  templateUrl: './upload-meme.component.html',
  styleUrls: ['./upload-meme.component.scss']
})
export class UploadMemeComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  constructor(public dialogRef: MatDialogRef<UploadMemeComponent>) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(ngform: NgForm) {

  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
