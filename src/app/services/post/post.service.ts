import {Injectable} from '@angular/core';
import {ApiBaseService} from '../_base/api-base.service';
import {PostModel} from '../../models/post/post.model';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {QuerySnapshot} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiBaseService {

  private postsCollection: AngularFirestoreCollection<PostModel>;

  constructor(private firestore: AngularFirestore) {
    super();
    this.postsCollection = this.firestore.collection<PostModel>('posts');
  }

  createPost(post: PostModel): Promise<DocumentReference> {
    return this.postsCollection.add(post);
  }

  getAllPost(): Promise<QuerySnapshot> {
    return this.postsCollection.ref.get();
  }
}
