import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() message = {title: '', body: ''}

  constructor() { }

  ngOnInit(): void { }

  public hideModal = () => {
    this.message.title = '';
    this.message.body = ''
  }
}
