import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface Segment {
  displayTxt: string;
  count: string;
  color: string;
}
@Component({
  selector: 'app-segmented-progress-bar',
  templateUrl: './segmented-progress-bar.component.html',
  styleUrls: ['./segmented-progress-bar.component.scss']
})
export class SegmentedProgressBarComponent {
  @Input() segments: Segment[] = [];
  @Output() segmentClicked = new EventEmitter<string>();

  getStatusColor(label: string): string {
    const segment = this.segments.find(s => s.displayTxt === label);
    return segment ? segment.color : '#ccc';
  }

  filterTable(label: string) {
    this.segmentClicked.emit(label);
  }
}

