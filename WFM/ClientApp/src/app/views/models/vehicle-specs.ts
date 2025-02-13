export interface VehicleSpecsDto{
        id: string;
        vehicleid: string;
        width: number;
        height: number;
        length: number;
        badlength: number;
        interiorvolume: number;
        cargovolume: number;
        groundclearance: number;
        doublelength: number;
        curbweight: number;
        grossvehicleweightrating: number | null;
        towingcapacity: number | null;
        enginessummary: string | null;
        enginebrand: string | null;
        aspiration: string | null;
        blocktype: string | null;
        bore: string | null;
        camtype: string | null;
        compression: string | null;
        cylinders: number | null;
        displacement: number | null;
        fuelinduction: string | null;
        maxhp: number | null;
        maxtorque: number | null;
        redlinerpm: number | null;
        stroke: string | null;
        valves: string | null;
        maxpayload: number | null;
        epacity: number | null;
        epahighway: number | null;
        epacombined: number | null;
        fuelquality: number | null;
        fueltank1capacity: number | null;
        fueltank2capacity: number | null;
        oilcapacity: number | null;
        transmissiondescription: number | null;
        transmissiongears: number | null;
        transmissionbrand: number | null;
        transmissiontype: number | null;
        drivetype: string | null;
        brakesystem: string | null;
        fronttrackwidth: number | null;
        reartrackwidth: number | null;
        wheelbase: number | null;
        frontwheeldiameter: number | null;
        rearwheeldiameter: number | null;
        rearaxle: string | null;
        fronttiretype: string | null;
        fronttirepsi: number | null;
        reartiretype: string | null;
        reartirepsi: number | null;
}

// public double? Width { get; set; }
// public double? Height { get; set; }
// public double? Length { get; set; }
// public double? InteriorVolume { get; set; }
// public double? CargoVolume { get; set; }
// public double? GroundClearance { get; set; }
// public double? DoubleLength { get; set; }
// public double? CurbWeight { get; set; }
// public double? GrossVehicleWeightRating { get; set; }
// public double? TowingCapacity { get; set; }
// public string? EngineSummary { get; set; }
// public string? EngineBrand { get; set; }
// public string? Aspiration { get; set; }
// public string? BlockType { get; set; }
// public string? Bore { get; set; }
// public string? CamType { get; set; }
// public string? Compression { get; set; }
// public double? Cylinders { get; set; }
// public double? Displacement { get; set; }
// public string? FuelInduction { get; set; }
// public double? MaxHP { get; set; }
// public double? MaxTorque { get; set; }
// public double? RedlineRPM { get; set; }
// public string? Stroke { get; set; }
// public string? Valves { get; set; }
// public double? MaxPayload { get; set; }
// public double? EPACity { get; set; }
// public double? EPAHighway { get; set; }
// public double? EPACombined { get; set; }
// public double? FuelQuality { get; set; }
// public double? FuelTank1Capacity { get; set; }
// public double? FuelTank2Capacity { get; set; }
// public double? OilCapacity { get; set; }
// public double? TransmissionDescription { get; set; }
// public double? TransmissionBrand { get; set; }
// public double? TransmissionType { get; set; }
// public string? DriveType { get; set; }
// public string? BrakeSystem { get; set; }
// public double? FrontTrackWidth { get; set; }
// public double? RearTrackWidth { get; set; }
// public double? WheelBase { get; set; }
// public double? FourWheelDiameter { get; set; }
// public double? RearWheelDiameter { get; set; }
// public string? RearAxle { get; set; }
// public string? FrontTireType { get; set; }
// public double? FrontTirePSI { get; set; }
// public string? RearTireType { get; set; }
// public double? RearTirePSI { get; set; }