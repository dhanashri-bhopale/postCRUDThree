import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'postCRUDThree';
  isLoading : boolean = false

  private _spinner = inject(SpinnerService)
  ngOnInit(): void {
    this._spinner.spinnerObs$.subscribe(res => {
      this.isLoading = res
    })
  }
}
