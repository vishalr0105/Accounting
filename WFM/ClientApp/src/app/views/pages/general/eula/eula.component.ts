import { Component, OnInit } from '@angular/core';
import { EulaService } from '../services/eula.service';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.component.html',
  styleUrls: ['./eula.component.scss']
})
export class EulaComponent implements OnInit {
  public eulaData: Array<any> = [];
  public pageSettings: Object = { pageSize: 10 };
  public filterSettings: Object = { type: 'Excel' }; // Enables global search filter
  public toolbarOptions: string[] = ['Search'];
  constructor(private eulaService:EulaService) {
    // this.eulaData = [
    //   { name: 'IMPRO', description: 'EULA to use IMPRO data products', acceptedBy: '-' },
    //   { name: 'Satellogic', description: 'EULA to use Satellogic data products', acceptedBy: '-' },
    //   { name: 'Car detection', description: 'EULA for Car detection by Orbital Insight', acceptedBy: '-' },
    //   { name: 'Change detection', description: 'EULA for Change detection by Spacept', acceptedBy: '-' },
    //   {
    //     name: 'Infrastructure change detection (Pléiades)',
    //     description: 'EULA for Infrastructure change detection (Pléiades) by Hyperverge',
    //     acceptedBy: '-'
    //   },
    //   {
    //     name: 'Infrastructure change detection (SPOT)',
    //     description: 'EULA for Infrastructure change detection (SPOT) by Hyperverge',
    //     acceptedBy: '-'
    //   },
    //   { name: 'Pansharpening', description: 'EULA for Pansharpening by Airbus', acceptedBy: '-' }
    // ];
  }

  // Accept EULA functionality
  acceptEula(data: any): void {
    console.log(data,'data');
    this.eulaService.patchEulas(data.id,data.currentDocumentId,{isAccepted:data.isAccepted}).subscribe(res=>{
      this.getEulaslist()

    })
    // alert(`EULA for ${data.name} accepted.`);
    // data.acceptedBy = 'You'; // Update the acceptedBy field
  }

  ngOnInit(): void {
    this.getEulaslist()
  }

  getEulaslist(){
    this.eulaService.getEulas().subscribe(res=>{
      this.eulaData=res
    })
  }
}
