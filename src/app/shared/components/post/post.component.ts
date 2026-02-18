import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost } from '../../models/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId !: string
  postObj !: Ipost

  constructor(
    private _postService : PostService,
    private _router : Router,
    private _routes : ActivatedRoute,
    private _matDialog : MatDialog,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getSinglePost()
  }

  getSinglePost(){
    this.postId = this._routes.snapshot.params['postId']
    this._postService.singlePostById(this.postId).subscribe({
      next : data =>{
        console.log(data)
        this.postObj = data
      }
    })
  }

  onRemove(){
    let matConfig = new MatDialogConfig()
    matConfig.width = '450px'
    matConfig.disableClose = true
    matConfig.data = `Are You Sure, You Want to Remove This Post <strong>${this.postObj.title}</strong>?`

    this._matDialog.open(GetConfirmComponent, matConfig).afterClosed().subscribe(res => {
      if(res){
        this._postService.removePost(this.postId).subscribe({
          next: data => {
            this._router.navigate(['posts'])
            this._snackbar.openSnackBar(`The Post ${this.postObj.title} Removed Successfully!!!`)
          }, error: err => {
            console.log(err);
            
          }
        })
      }
    })
  }

}
