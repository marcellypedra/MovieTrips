import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';  // PostService to manage posts
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

 
   handleNewPost(post: any): void {
    this.postService.addPost(post); 
    this.router.navigate(['/tab1']);
  }

  ngOnInit() {
  }

}
