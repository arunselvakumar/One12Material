import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthService} from '../../../../services/auth/auth.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {PostService} from '../../../../services/post/post.service';

@Component({
  templateUrl: './upload-meme.component.html',
  styleUrls: ['./upload-meme.component.scss']
})
export class UploadMemeComponent implements OnInit {

  private downloadURL: Observable<string>;

  uploadPercent: Observable<number>;
  filePath: string;
  selectedFile: File;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  constructor(public dialogRef: MatDialogRef<UploadMemeComponent>,
              private fireStorage: AngularFireStorage,
              private userAuthorizationService: AuthService,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(ngform: NgForm) {
    const currentUser = this.userAuthorizationService.getCurrentUser();
    if (currentUser) {

      const filePath = currentUser.uid + '/stories/' + this.selectedFile.name;
      const fileRef = this.fireStorage.ref(filePath);
      const uploadTask = this.fireStorage.upload(filePath, this.selectedFile);

      this.uploadPercent = uploadTask.percentageChanges();

      uploadTask.snapshotChanges().pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(value => {
          this.postService.createPost({
            id: null,
            content: value,
            title: ngform.value.title,
            source: ngform.value.source,
            description: ngform.value.description,
            tags: this.tags,
            postedBy: currentUser.uid,
            isDeleted: false
          }).then(value1 => {
            console.log(value1);
            this.closeDialog();
          });
        });
      }))
        .subscribe();
    }
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
