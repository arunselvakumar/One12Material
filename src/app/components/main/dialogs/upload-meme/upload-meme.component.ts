import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AuthService} from '../../../../services/auth/auth.service';
import {PostService} from '../../../../services/post/post.service';

@Component({
  templateUrl: './upload-meme.component.html',
  styleUrls: ['./upload-meme.component.scss']
})
export class UploadMemeComponent implements OnInit {

  filePath: string;
  selectedFile: File;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  constructor(public dialogRef: MatDialogRef<UploadMemeComponent>,
              private userAuthorizationService: AuthService,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(ngform: NgForm) {

    const post = {
      id: null,
      content: null,
      title: ngform.value.title,
      source: ngform.value.source,
      description: ngform.value.description,
      tags: this.tags,
      postedBy: null,
      isDeleted: false
    };

    this.postService.uploadPost(this.selectedFile, post);

    this.closeDialog();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.filePath = this.selectedFile ? this.selectedFile.name : '';
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
