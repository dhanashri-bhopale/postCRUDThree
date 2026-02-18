import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // 🔥 Add this variable
  isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // 🔥 Add this method
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
