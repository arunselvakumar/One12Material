import {Injectable} from '@angular/core';
import {ApiBaseService} from '../_base/api-base.service';
import {PostModel} from '../../models/post/post.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthService} from '../auth/auth.service';
import {finalize, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiBaseService {

  private postsCollectionRef: AngularFirestoreCollection<PostModel>;

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private userAuthorizationService: AuthService,
    public snackBar: MatSnackBar) {

    super();
    this.postsCollectionRef = this.firestore.collection<PostModel>('posts');

  }

  uploadPost(selectedFile: File, post: PostModel) {

    const currentUser = this.userAuthorizationService.getCurrentUser();

    if (currentUser) {

      this.snackBar.open('The Story will upload in background, we will notify you once done!', 'Dismiss', {duration: 5000});

      const filePath = currentUser.uid + '/stories/' + selectedFile.name;
      const fileRef = this.fireStorage.ref(filePath);
      const uploadTask = this.fireStorage.upload(filePath, selectedFile);

      uploadTask.snapshotChanges().pipe(finalize(() => {
        const downloadURL = fileRef.getDownloadURL();
        downloadURL.subscribe(value => {

          post.content = value;
          post.postedBy = currentUser.uid;

          this.createPost(post);
        });
      })).subscribe();

    }
  }

  createPost(post: PostModel) {
    this.postsCollectionRef.add(post);
  }

  deletePost(id: string) {
    this.postsCollectionRef.doc(id).update({idDeleted: true});
  }

  likePost(id: string) {
    const currentUser = this.userAuthorizationService.getCurrentUser();

    if (currentUser) {
      // this.postsCollectionRef.doc(id).update()
    }
  }

  getAllPosts(): Observable<any[]> {
    return this.postsCollectionRef.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({...c.payload.doc.data(), id: c.payload.doc.id}));
    }));
  }
}
