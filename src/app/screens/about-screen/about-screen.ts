import { Component, OnInit } from '@angular/core';
import { State } from '../../state';

@Component({
  selector: 'app-about-screen',
  standalone: false,
  templateUrl: './about-screen.html',
  styleUrl: './about-screen.css'
})
export class AboutScreen implements OnInit {
  constructor(public state:State) {}

  ngOnInit(): void {
    this.state.setTite("About")
  }
}