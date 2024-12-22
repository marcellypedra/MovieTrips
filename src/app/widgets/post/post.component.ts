import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PostDataService } from '../../services/post-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  @Input() post: any;
 

  constructor(private postDataService: PostDataService) { }



  ngOnInit() {}


}




