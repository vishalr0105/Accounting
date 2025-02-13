export default class SchdeulingPrefrences {
    id: string;
    CustomerDateAndTime: boolean;
    PreferredTechnicians: boolean;
    technicianAvailability: boolean;
    technicianSkills:boolean;
    technicianCertifications:boolean;
    technicianWorkTypes:boolean;
    technicianRegion:boolean;
    GPSLocationOfTechnician:boolean;
    AllowOvertimeSlots:boolean;
    ExcludeWeekends:boolean;
    ExcludePublicHolidays:boolean;
    PreferenceToLabourCost:string;
    TravelTimeBetween:string;
    TimeDuration:string;
    DistanceRestriction:string;
}