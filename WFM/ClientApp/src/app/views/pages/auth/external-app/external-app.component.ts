import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IntegrationService } from 'src/app/views/services/integration.service';

@Component({
  selector: 'app-external-app',
  templateUrl: './external-app.component.html',
  styleUrls: ['./external-app.component.scss']
})
export class ExternalAppComponent implements OnInit {

  constructor(
    private integrationservice: IntegrationService,
    private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var qbcode=this.route.snapshot.queryParams['code'];
    localStorage.setItem('QBCode',JSON.stringify(qbcode));
    this.integrationservice.GetQbAccessToken(qbcode).subscribe((res: any) => {
    
      localStorage.setItem('QbAccessToken', JSON.stringify(res.accesstoken));
    })
  }

}
