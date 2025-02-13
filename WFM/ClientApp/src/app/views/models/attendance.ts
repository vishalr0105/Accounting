export class Attendance {
    id: string;
    userId: string;
    userName: string;
    fromDate: string;
    toDate: string;
    fromTime?: string;
    toTime?: string;
    attendanceTypeId?: string = "";
    attendanceTypeName: string;
    note: string;
    isApproved: boolean;
    approvalDate: string;
    isRejected: boolean;
    rejectDate: string;
    rejectReason: string;
}
