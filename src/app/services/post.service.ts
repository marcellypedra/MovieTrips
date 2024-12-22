import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: any[] = []; // Combined posts: default + user-added
  private storageKey = 'posts'; 

  constructor(private file: File, private platform: Platform,) {
    this.loadPosts(); // // Load posts from localStorage
  }

  // Add a new post with optional media
  addPost(post: { MovieName: string; description: string; media: { src: string, type: string }; user: string }): void {
    if (!post.media || typeof post.media !== 'object') {
      throw new Error('Media must be provided as an object with src and type.');
    }
    this.posts.push(post);
    this.savePosts(); 
  }

  // Get all posts (default + user-created)
  getPosts(): any[] {
    return this.posts; 
  }

  // Save posts to localStorage
  private savePosts(): void {
    try {
      localStorage.setItem('userPosts', JSON.stringify(this.posts));
      console.log('Posts saved successfully to localStorage.');
    } catch (err) {
      console.error('Error saving posts to localStorage:', err);
    }
  }


  // Load posts from localStorage
  private loadPosts(): void {
    try {
      const savedPosts = localStorage.getItem('userPosts');
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts).map((post: any) => ({
          ...post,
          media: post.media && typeof post.media === 'object' ? post.media : { src: '', type: '' }
        }));
        console.log('User-created posts loaded from local storage:', this.posts);
      } else {
        this.posts = []; 
      }
    } catch (error) {
      console.error('Error loading posts from local storage:', error);
      this.posts = [];
    }
  }
}
