import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TuneService } from '../Api-services/tune.service';

import { TuneDetails } from '../Api-services/tune-details.interface';

@Component({
  selector: 'app-tunes-list',
  templateUrl: './tunes-list.component.html',
  styleUrls: ['./tunes-list.component.css']
})
export class TuneListComponent implements OnInit, OnDestroy{

  harpTuneDetails: TuneDetails = {} as TuneDetails;
  fiddleTuneDetails: TuneDetails = {} as TuneDetails;
  accordionTuneDetails: TuneDetails = {} as TuneDetails;

  constructor(private tuneService: TuneService, private route: ActivatedRoute){}

  showHarpInfo: boolean = false;
  showFiddleInfo: boolean = false;
  showAccordionInfo: boolean = false;
  //instruments
  isFirstButtonClicked = false;
  showHarpTunesList = false;
  showFiddleTunesList = false;
  showAccordionTunesList = false;

  // THE BLOOMING MEADOWS : https://thesession.org/tunes/4066
  public urlHarpSet = "4066";
  // COOLEY'S : https://thesession.org/tunes/1
  public urlFiddleSet = "1";
  // THE HOLE IN THE HEDGE :  https://thesession.org/tunes/755
  public urlAccordionSet = "755";

//FROM ADDTUNECOMPONENT
  tuneId!: number;
  instrument: string ='';
  notation!: string ;

//name for the ids
  public harp_Tune = "";
  public harpNotes ='';
  harpName: string ='';
  public fiddle_Tune = "";
  public fiddleNotes ='';
  fiddleName: string ='';
  public accordion_Tune = "";
  public accordionNotes ='';
  accordionName: string ='';

  private queryParamsSubscription: Subscription | undefined
//GET INFO FROM ADD TUNE
  ngOnInit(){
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.tuneId = params['tuneId'];
      this.instrument = params['instrument'];

      if(this.instrument === 'harp'){
        this.harpName = params['name'];
        this.harpNotes = params['notes'];
        this.harp_Tune = (this.tuneId).toString();
      }
      else if(this.instrument === 'fiddle'){
        this.fiddleName = params['name'];
        this.fiddleNotes = params['notes'];
        this.fiddle_Tune = (this.tuneId).toString();
      }
      else if(this.instrument === 'accordion'){
        this.accordionName = params['name'];
        this.accordionNotes = params['notes'];
        this.accordion_Tune = (this.tuneId).toString();
      }
    })
  }ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
  
//hide show buttons
  public harpTune(){
    this.showHarpTunesList = !this.showHarpTunesList; // set showTunesList to true when tuneDetails is set
    this.showFiddleTunesList = false;
    this.showAccordionTunesList = false;
  }
  public fiddleTune(){
    this.showFiddleTunesList = !this.showFiddleTunesList;
    this.showHarpTunesList = false;
    this.showAccordionTunesList = false;
  }
  public accordionTune(){
    this.showAccordionTunesList = !this.showAccordionTunesList
    this.showHarpTunesList = false;
    this.showFiddleTunesList = false;
  }


  public showTuneInfo(tuneUrl: string): void {
    this.tuneService.getTuneDetails(parseInt(tuneUrl)).subscribe(details => {
      console.log(tuneUrl);
      switch(tuneUrl) {
        case this.urlHarpSet:
        case this.harp_Tune:
          this.harpTuneDetails = details;
          // this.updateNotesInSettings(this.harpTuneDetails, this.harpName, this.harpNotes);
          this.showHarpInfo = !this.showHarpInfo;
          break;
        case this.urlFiddleSet:
        case this.fiddle_Tune:
          this.fiddleTuneDetails = details;
          // this.updateNotesInSettings(this.fiddleTuneDetails, this.fiddleName, this.fiddleNotes);
          this.showFiddleInfo = !this.showFiddleInfo;
          break;
        case this.urlAccordionSet:
        case this.accordion_Tune:
          this.accordionTuneDetails = details;
          // this.updateNotesInSettings(this.accordionTuneDetails, this.accordionName, this.accordionNotes);
          this.showAccordionInfo = !this.showAccordionInfo;
          break;
        default:
          // Handle unknown URL
          break;
      }
    });
  }
}
