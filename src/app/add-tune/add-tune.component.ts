
import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Tune, TuneSettings } from '../Api-services/site-model';
import { TuneDetails } from '../Api-services/tune-details.interface'
import { TuneService } from '../Api-services/tune.service';
import * as abcjs from 'abcjs';

@Component({
  selector: 'app-add-tune',
  templateUrl: './add-tune.component.html',
  styleUrls: ['./add-tune.component.css']
})
export class AddTuneComponent {
  @Output() tuneAdded = new EventEmitter<{tune: Tune}>();
  @Input() addTuneVisible: boolean = false;

  constructor(private tuneService: TuneService, private http: HttpClient, 
    private router: Router,
    private cd: ChangeDetectorRef) {}

  selectedTune ='';
  showSelectedTune = false;
  filteredTunes: string [] = [];
  selectedInstrument = '';

  tuneNotations: string [] =[];
  selectedNotes = '';
  showSelectedNotes = false;

    // Add class properties to store selected tune details
  selectedTuneId = '';
  selectedTuneSettings: TuneSettings[] = [];

  searchTunes(searchTerm: string) {
    this.tuneService.searchTunes(searchTerm).subscribe((response: any) => {
      const tunes = response.tunes.map((tune: { name: string }) => tune.name);
      const filteredTunes = tunes.filter((tuneName: string) =>
        tuneName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.filteredTunes = filteredTunes;
    });
  }

    // ADDTUNE() send name, instrument and tuneId to TuneList
    addTune(selectedTune: string, selectedInstrument: string, selectedNotes: string) {
      if (!this.selectedTuneId || !this.selectedTuneSettings) {
        console.log('Please select a tune first.');
        return;
      }
      this.router.navigate(['/tunes-list'], { 
        queryParams: { 
          name: this.selectedTune, 
          tuneId: this.selectedTuneId, 
          instrument: this.selectedInstrument,
          notes: this.selectedNotes
        } 
      });
      this.selectedTune = '';
      this.selectedInstrument = '';
      this.selectedNotes = '';
      this.addTuneVisible = false;
      // console.log(this.addTuneVisible);
      this.cd.detectChanges(); // Manually trigger change detection
    }
    
  // SELECTTUNE() WITH ATTEMPT TO GET THE TUNES INFO.
  selectTune(tuneName: string) {
    this.selectedTune = tuneName;
    const url = `https://thesession.org/tunes/search?q=${tuneName}&format=json`;

    this.http.get(url).subscribe((response: any) => {
      const tune = response.tunes[0];
      if (!tune) {
        console.log('Could not find tune');
        return;
      }
      this.selectedTuneId = tune.id;
      this.showSelectedTune = true;

      this.tuneService.getTuneDetails(parseInt(this.selectedTuneId)).subscribe((details: TuneDetails) => {
        if (!details.settings || details.settings.length === 0) {
          console.log('Could not find tune details');
          return;
        }
        this.selectedTuneSettings = details.settings.map(setting => ({
          id: setting.id,
          name: details.name,
          type: details.type,
          key: setting.key,
          url: setting.url,
          abc: setting.abc,
          member: setting.member,
          date: setting.date
        }));

        this.tuneNotations = details.settings.map(setting => setting.abc);
      });
    });
  }

  selectNotations(notes: string) {
    this.selectedNotes = notes;
    console.log('Selected notation:', notes);
    abcjs.renderAbc('notation', this.tuneNotations.join(' '), {
      staffwidth: 700,
      scale: 1.2,
      responsive: "resize",
      paddingbottom: 50,
    });
    this.showSelectedNotes = true;
  }
}