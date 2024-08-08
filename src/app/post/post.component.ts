import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface Post{
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment{
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];
  userId: number | undefined;
  isLoading: Boolean = true;
  comments: {[key: number]: Comment[]} = {};
  visibleCommentsPostId: number | null = null;

  router: Router = inject(Router);

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {

    const userIdParam = this.route.snapshot.paramMap.get('id');

    if (userIdParam) {
      this.userId = +userIdParam; 
      this.fetchPosts();
    }

  }

  fetchPosts(): void {
    if (this.userId !== undefined){
      this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`)
      .subscribe((data) => {
        this.posts = data;
        this.isLoading = false;
      });
    } 
  }

  goBack(){
    this.router.navigate(['/user']);
  }

  fetchComments(postId: number): void {
    if (this.comments[postId]){
      this.visibleCommentsPostId = this.visibleCommentsPostId === postId ? null : postId;
    }else {
      this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .subscribe((data) => {
        this.comments[postId] = data;
        this.visibleCommentsPostId = postId;
      })
    }

  }
}
