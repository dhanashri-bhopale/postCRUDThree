import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipost } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm !: FormGroup
  isInEdtMode : boolean = false
  postId !: string

  constructor(
    private _postService : PostService,
    private _router : Router,
    private _routes : ActivatedRoute,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.onPatchValue()
  }

  createForm(){
    this.postForm = new FormGroup({
      title : new FormControl(null, [Validators.required]),
      content : new FormControl(null, [Validators.required])
    })
  }

  get title(){
    return this.postForm.get(['title']) as FormControl
  }

  get content(){
    return this.postForm.get(['content']) as FormControl
  }

  onPostAdd(){
    if(this.postForm.valid){
      let postObj : Ipost = {...this.postForm.value}
      this._postService.createPost(postObj).subscribe({
        next: data => {
          this.postForm.reset()
          this._router.navigate(['posts'])
          this._snackbar.openSnackBar(`The Post ${postObj.title} Added Successfully!!!`)
        }
      })
    }
  }

  onPatchValue(){
    this.postId = this._routes.snapshot.params['postId']
    if(this.postId){
      this.isInEdtMode = true
      this._postService.singlePostById(this.postId).subscribe({
        next: data => {
          this.postForm.patchValue(data)
          this._snackbar.openSnackBar(`The Data Patched Successfully!!!`)
        }, error : err => {
          console.log(err);
          
        }
      })
    }
  }

  onUpdatePost(){
    if(this.postForm.valid){
      let updatedPost : Ipost = {...this.postForm.value, postId : this.postId}
      this._postService.updatePost(updatedPost).subscribe({
        next : data => {
          this.isInEdtMode = false
          this.postForm.reset()
          this._router.navigate(['/posts'])
          this._snackbar.openSnackBar(`The Post ${data.title} Updated Successfully!!!`)
        }
      })
    }
  }

}
