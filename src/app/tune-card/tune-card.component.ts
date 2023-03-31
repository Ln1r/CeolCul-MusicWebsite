import { Component, Input, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import * as abcjs from 'abcjs';

@Component({
  selector: 'app-tune-card',
  templateUrl: './tune-card.component.html',
  styleUrls: ['./tune-card.component.css']
})
export class TuneCardComponent implements AfterViewInit  {
  @Input() tuneDetails: any;
  @Input() buttonText: string ='';
  @Input() starIdPrefix: string ='';
  @Input() tuneNotes: string = '';

  constructor() { }

  @ViewChildren('sheetMusic') sheetMusicRefs!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.renderNotations();
  }
  renderNotations() {
    this.sheetMusicRefs.forEach((sheetMusicElem: ElementRef, i: number) => {
      const notation = this.tuneDetails.settings[i].abc;
      const abcArray = notation.split(/\|\||:\|/);
      const separatorArray = notation.match(/\|\||:\|/g); // get array of separator strings
      const joinedNotation = abcArray.join("\n"); // join the array elements with newline separator
      const renderedNotation = separatorArray.reduce((acc: string, sep: string, i: number) => acc + sep + "\n" + abcArray[i+1], abcArray[0]); // add separators back to notation
      
      abcjs.renderAbc(sheetMusicElem.nativeElement, renderedNotation);
    });
  }
}
