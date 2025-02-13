import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Appointment, AppointmentDocument, RecreateAppt } from '../models/appointment.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { Guid } from '@syncfusion/ej2/pdf-export';




@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  rootController = `${environment.baseUrl}/api/Appointment`;


  constructor(private http: HttpClient, private authService: AuthService) { }

  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.authService.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  })

  addAppointment(appointment: Appointment) {
    console.log(appointment)
    return this.http.post<Appointment>(`${this.rootController}/add`, appointment, { 'headers': this.header });
  }
  updateAppointment(appointment: Appointment) {
    return this.http.patch<Appointment>(`${this.rootController}/update-appointment`, appointment, { 'headers': this.header });
  }

  getAppointmentsByUserId(userId: string) {
    return this.http.get<Appointment[]>(`${this.rootController}/list/${userId}`, { 'headers': this.header })
  }

  getAllAppointments(companyId: string) {

    return this.http.get<Appointment[]>(`${this.rootController}/list/all/${companyId}`, { 'headers': this.header })
  }

  getAllAppointmentsForPendingTriage(companyId: string) {
    return this.http.get<Appointment[]>(`${this.rootController}/GetAllAppointmentsForPendingTriage/${companyId}`, { 'headers': this.header })
  }

  getAppointmentById(appointmentId: Guid):Observable<any> {
    return this.http.get<Appointment>(`${this.rootController}/${appointmentId}`, { 'headers': this.header })
  }

  getAppointmentDocs(id)
  {
    return this.http.get<AppointmentDocument[]>(`${this.rootController}/get-appointment-docs?appointmentID=${id}`, { 'headers': this.header })

  }
  addAppointmentDocuments(data:any):Observable<any>{
    return this.http.post<AppointmentDocument>(`${this.rootController}/AddAppointmentDocument`,data,{headers:this.header});
  }
  getNextActionName(aptStatus:any):string{
    switch(aptStatus){
      case 1:return 'Triage';
      case 2:return 'Quote';
      case 3:return 'CustomerApproval';
      case 4:return 'Workorder';
      case 5:return 'Invoice';
      case 6:return 'Payment';
      default:'Triage'
    }
  }



  deleteAppointment(id: Guid) {
    return this.http.delete(`${this.rootController}/delete/${id}`, { 'headers': this.header });
  }

  generateWorkOrder(appointment: Appointment) {
    return this.http.post<boolean>(`${this.rootController}/generatewo`, appointment, { 'headers': this.header });
  }

  getAllPendingAppointments(companyId: string) {
    return this.http.get<Appointment[]>(`${this.rootController}/list/all/pending/${companyId}`, { 'headers': this.header })
  }

  getAppointStatus():Observable<any>
  {
    return this.http.get(`${this.rootController}/get-appointmentStatus`, { 'headers': this.header })
  }
  recreateAppt(recreateAppt:any){
    return this.http.post(`${this.rootController}/recreateAppointment`, recreateAppt, { 'headers': this.header });
  }
}
