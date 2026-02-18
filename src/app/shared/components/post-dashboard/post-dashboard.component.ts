import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Ipost } from '../../models/post';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  postArr !: Ipost[]

  constructor(
    private _postService : PostService
  ) { }

  ngOnInit(): void {
    this.getFetchPost()
  }

  getFetchPost(){
    this._postService.fetchPost().subscribe({
      next : data =>{
        console.log(data)
        this.postArr = data
      },error : err => {
        console.log(err);
        
      }
    })
  }

  trackById(index : number, post : Ipost){
    return post.postId
  }

}
