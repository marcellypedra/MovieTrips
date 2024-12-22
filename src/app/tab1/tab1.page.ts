import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { PostDataService } from '../services/post-data.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  posts: any[] = [];
  
  
  
  constructor(private router: Router, 
    private postService: PostService, 
    private postDataService: PostDataService, 
    private menu: MenuController
  ) {}



  ngOnInit() {
      this.loadPosts(); // Load posts when the page initializes
    }

    loadPosts(): void {
    const defaultPosts = this.postDataService.getDefaultPosts();  
    
   
// Format default posts to ensure media is in the correct structure
    const formattedDefaultPosts = defaultPosts.map(post => {
      if (post.media && typeof post.media === 'string') {
        return {
          ...post,
          media: {
            src: post.media,
            type: post.media.includes('data:image') ? 'image' : 'video'
          }
        };
      }
      return post;
    });


    const userPosts = this.postService.getPosts(); 

// Format user-created posts
    const formattedUserPosts = userPosts.map(post => {
      if (post.media && typeof post.media === 'string') {
        return {
          ...post,
          media: {
            src: post.media,
            type: post.media.includes('data:image') ? 'image' : 'video'
          }
        };
      }
      return post;
    });


    this.posts = [...formattedDefaultPosts, ...formattedUserPosts];
  }


}