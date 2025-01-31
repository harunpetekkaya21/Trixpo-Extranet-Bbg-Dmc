import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title-and-info',
  standalone: true,
  imports: [],
  templateUrl: './page-title-and-info.component.html',
  styleUrl: './page-title-and-info.component.scss'
})
export class PageTitleAndInfoComponent {
  @Input() pageMainTitle: string = '';
  @Input() pageMainInfo: string = '';
}
