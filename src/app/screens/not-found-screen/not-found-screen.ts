import { Component, OnInit } from '@angular/core';
import { State } from '../../state';

@Component({
  selector: 'app-not-found-screen',
  standalone: false,
  templateUrl: './not-found-screen.html',
  styleUrl: './not-found-screen.scss'
})
export class NotFoundScreen implements OnInit {
  constructor(public state:State) {}

  ngOnInit(): void {
    this.state.setTite("Error")
  }
}
