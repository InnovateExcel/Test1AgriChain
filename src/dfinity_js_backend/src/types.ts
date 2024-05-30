import { text, Record, Variant, Vec, Principal, Opt, nat64, bool } from "azle";

// Structs and Enums

export const Packaging = Record({
  packagingMaterial: text,
  packagingType: text,
  packagingSize: text,
  packagingColor: text,  
  packagingDate: text,
});

export const Product = Record({
  id: text,
  name: text,
  description: text,
  owner:text,
  price: nat64,
  quantity: nat64, // Initial zero
  grade: text,
  category: text,
  image: text,
  status: text,
  packagedDetails: Opt(Packaging),
  pickedUp: bool, // If picked Up by the Distributor is true || status is picked up then add to the Farmer Records
  packaged: bool,
  farmerSold: bool,
  distributionSuccesful: bool,
  processingSuccesful: bool,
});

export const Farmer = Record({
  id: text,
  owner: Principal,
  fullName: text,
  contactInfo: text,
  companyName: text,
  companyRegNo: text,
  farmSize: text,
  farmLocation: text,
  farmType: text, // Crop Farming ,Livestock Farming , Mixed Farming etc
  farmProducts: Vec(Product), // This will be a list of products the farm produces
  pickedUpProducts: Vec(Product), // This will be a list of products the farm has sold
  farmerRating: nat64,
  certification: Vec(text), // This will be a list of certifications eg (Organic, Fair Trade, etc)
});

export const Vehicle = Record({
  id: text,
  owner:text , // This is a Distributors Company ID
  vehicleMake: text, // This is the make of the vehicle  eg(Toyota, Benz, etc)
  vehicleModel: text, // This is the model of the vehicle  eg(Camry, Corolla, etc)
  vehicleType: text, // This is the type of the vehicle  eg(SUV, Sedan, etc)
  vehicleRegNo: text,
});

export const Driver = Record({
  id: text,
  owner: Principal,
  fullName: text,
  contact: text,
  experience: text, // This is the Year of Experience as Driver
  licenseNo: text,
  licenseExpiry: text,
  qualifications: Vec(text),
  assignedVehicle: Opt(Vehicle),  // Distributors will assign a vehicle to the driver
  assignedCompany: bool, // This will be true if the driver is assigned to a company
  driverRating: nat64, // This will be the average rating of the drivers
  driverStatus: text, // This will be the status of the driver eg(Active, Inactive, etc)
});
  
export const DistributorsCompany = Record({
  id: text,
  name: text,
  address: text,
  email: text,
  phone: text,
  owner: Principal,
  bussinessType: text, //Logistics Company, Transport Company, etc
  YearsInOperation: text,
  marketCoverage: text, //Local, Regional, National, International
  drivers: Vec(Driver),
  transportationFleet: Vec(Vehicle),
  completeproductsDistribution: Vec(Product), // This is added when their is a Succesful Distribution
  regNo: text,
  logo: text,
});

export const ProcessingCompany = Record({
  id: text,
  name: text,
  address: text,
  email: text,
  phone: text,
  owner: Principal,
  bussinessType: text, // Processing Company, Manufacturing Company, etc
  YearsInOperation: text,
  productsSuccesfulProcessing: Vec(Product), // This is added when their is a Succesful Processing
  regNo: text,
  logo: text,
});

export const Wholesalers = Record({
  id: text,
  name: text,
  address: text,
  email: text,
  phone: text,
  owner: Principal,
  bussinessType: text, // Wholesalers, Retailers, etc
  YearsInOperation: text,
  productsRecieved: Vec(Product), // This is added when their is a Succesful Wholesales
  regNo: text,
  logo: text,
});

// Delivery Details
export const DeliveryDetails = Record({
  id: text,
  processorsId: text,
  farmerId: text,
  productId: text,
  driverId: Opt(text),
  distributorsId: text,
  pickupDate: text, // This is the date the product will be picked up
  pickupRegion: text,
  deliveredDate: Opt(text), // This is the date the product will be delivered
  deliveredRegion: text,
  deliveryPriority: text,
  deliveryDescription: text,
  deliveryStatus: text,
});

  
// Delivery Draft
export const DeliveryTender = Record({
  id: text,
  DeliveryDetailsId: text,
  tenderTitle: text,
  tenderDescription: text, // Gives the details of the delivery
  processorsId: text,
  distributorsId: text,
  deliveryWeight: nat64, // we will use KG
  costPerWeight: nat64,
  additionalCost: nat64,
  totalCost: nat64,
  accepted: bool,
});

// The Farmer Sale  
// This is the sale of the product by the farmer.... will be looked into by processing company
export const FarmerSaleAdvert = Record({
  id: text,
  farmerId: text,
  processorCompanyId : text,
  productId: text,
  quantity: nat64,
  price: nat64,
  status: text,
  farmerPaid: bool,
});

// payloads
export const FarmerSaleAdvertPayload = Record({
  farmerId: text,
  processorCompanyId: text,
  productId:text,
  quantity: nat64,
  price: nat64,
});
export const FarmerPayload = Record({
  fullName: text,
  contactInfo: text,
  companyName: text,
  companyRegNo: text,
  farmSize: text,
  farmLocation: text,
  farmType: text, // Crop Farming ,Livestock Farming , Mixed Farming etc
});

export const VehiclePayload = Record({
  vehicleMake: text, // This is the make of the vehicle  eg(Toyota, Benz, etc)
  vehicleModel: text, // This is the model of the vehicle  eg(Camry, Corolla, etc)
  vehicleType: text, // This is the type of the vehicle  eg(SUV, Sedan, etc)
  vehicleRegNo: text,
});

export const DriverPayload = Record({
  fullName: text,
  contact: text,
  experience: text, // This is the Year of Experience as Driver
  licenseNo: text,
  licenseExpiry: text,
});

export const ProductPayload = Record({
  name: text,
  description: text,
  category: text,
  image: text,
  // status: text, // New, Used, etc
});

// grading payload
export const GradePayload = Record({
  productId : text,
  grade: text,
  quantity: nat64,
  price: nat64,
  
});


export const DistributorsCompanyPayload = Record({
  name: text,
  address: text,
  email: text,
  phone: text,
  bussinessType: text, //Logistics Company, Transport Company, etc
  YearsInOperation: text,
  marketCoverage: text, //Local, Regional, National, International
  regNo: text,
  logo: text,
});

export const ProcessingCompanyPayload = Record({
  name: text,
  address: text,
  email: text,
  phone: text,
  bussinessType: text, // Processing Company, Manufacturing Company, etc
  YearsInOperation: text,
  regNo: text,
  logo: text,
});

export const WholesalersPayload = Record({
  name: text,
  address: text,
  email: text,
  phone: text,
  bussinessType: text, // Wholesalers, Retailers, etc
  YearsInOperation: text,
  regNo: text,
  logo: text,
});

export const DeliveryDetailsPayload = Record({
  processorsId: text,
  farmerId: text,
  productId: text,
  distributorsId: text,
  pickupDate: text,
  pickupRegion: text,
  deliveredRegion: text,
  deliveryPriority: text,
  deliveryDescription: text,
});

// Created by the Distributors when processors assignes a delivery
export const DeliveryTenderPayload = Record({
  tenderTitle: text,
  DeliveryDetailsId: text,
  tenderDescription: text, // Gives the details of the delivery
  processorsId: text,
  distributorsId: text,
  deliveryWeight: nat64, // we will use KG
  costPerWeight: nat64,
  additionalCost: nat64,
});

export const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
});

export const PaymentStatus = Variant({
  PaymentPending: text,
  Completed: text,
});

export const ReserveDriverPayment = Record({
  DistributorId: text,
  price: nat64,
  status: text,
  distributorPayer: Principal,
  driverReciever: Principal,
  paid_at_block: Opt(nat64),
  memo: nat64,
});

export const ReserveFarmerPayment = Record({
  ProcessorId: text,
  price: nat64,
  status: text,
  processorPayer: Principal,
  farmerReciever: Principal,
  paid_at_block: Opt(nat64),
  memo: nat64,
});

export const ReserveDistributorsPayment = Record({
  ProcessorId: text,
  price: nat64,
  status: text,
  processorPayer: Principal,
  distributorReciever: Principal,
  paid_at_block: Opt(nat64),
  memo: nat64,
});


// Will work on this when Wholesaler is added
export const ReserveProcessingPayment = Record({
  WholesalersId: text,
  price: nat64,
  status: text,
  WholesalersPayer: Principal,
  processorReciever: Principal,
  paid_at_block: Opt(nat64),
  memo: nat64,
});
