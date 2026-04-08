export interface ComplianceIssue {
  id: string;
  description: string;
  severity: "high" | "medium" | "low";
  dateReported: string;
}

export interface Vendor {
  id: string;
  companyName: string;
  businessAddress: string;
  contactPhone: string;
  totalDrivers: number;
  totalCars: number;
  complianceStatus: "compliant" | "non-compliant" | "pending";
  complianceIssues: ComplianceIssue[];
  email: string;
}

export interface VendorApplication {
  id: string;
  businessName: string;
  numberOfCars: number;
  numberOfVehicles: number;
  email: string;
  phone: string;
  status: "NEW" | "done";
  internalNotes?: string;
}

export const mockVendors: Vendor[] = [
  {
    id: "VND-001",
    companyName: "Metro Fleet Services",
    businessAddress: "123 Main St, New York, NY 10001",
    contactPhone: "(212) 555-0101",
    totalDrivers: 45,
    totalCars: 38,
    complianceStatus: "compliant",
    complianceIssues: [],
    email: "ops@metrofleet.com",
  },
  {
    id: "VND-002",
    companyName: "City Wheels Transport",
    businessAddress: "456 Oak Ave, Los Angeles, CA 90012",
    contactPhone: "(323) 555-0202",
    totalDrivers: 120,
    totalCars: 95,
    complianceStatus: "non-compliant",
    complianceIssues: [
      { id: "CI-1", description: "Insurance documentation expired for 5 vehicles", severity: "high", dateReported: "2026-03-15" },
      { id: "CI-2", description: "Driver background check pending for 3 drivers", severity: "medium", dateReported: "2026-03-28" },
    ],
    email: "admin@citywheels.com",
  },
  {
    id: "VND-003",
    companyName: "FastTrack Rentals",
    businessAddress: "789 Pine Rd, Chicago, IL 60601",
    contactPhone: "(312) 555-0303",
    totalDrivers: 22,
    totalCars: 18,
    complianceStatus: "pending",
    complianceIssues: [
      { id: "CI-3", description: "Annual vehicle inspection overdue for 2 vehicles", severity: "low", dateReported: "2026-04-01" },
    ],
    email: "hello@fasttrackrentals.com",
  },
  {
    id: "VND-004",
    companyName: "Elite Auto Partners",
    businessAddress: "321 Elm Blvd, Houston, TX 77001",
    contactPhone: "(713) 555-0404",
    totalDrivers: 67,
    totalCars: 52,
    complianceStatus: "compliant",
    complianceIssues: [],
    email: "contact@eliteauto.com",
  },
  {
    id: "VND-005",
    companyName: "Harbor Drive Co.",
    businessAddress: "555 Harbor Dr, Miami, FL 33101",
    contactPhone: "(305) 555-0505",
    totalDrivers: 33,
    totalCars: 28,
    complianceStatus: "non-compliant",
    complianceIssues: [
      { id: "CI-4", description: "Operating license renewal pending", severity: "high", dateReported: "2026-04-03" },
      { id: "CI-5", description: "Missing vehicle registration for 1 car", severity: "medium", dateReported: "2026-04-05" },
      { id: "CI-6", description: "Safety training certificates expired for 4 drivers", severity: "high", dateReported: "2026-03-20" },
    ],
    email: "ops@harbordrive.com",
  },
];

export const mockApplications: VendorApplication[] = [
  {
    id: "APP-001",
    businessName: "Sunrise Mobility LLC",
    numberOfCars: 15,
    numberOfVehicles: 20,
    email: "info@sunrisemobility.com",
    phone: "(404) 555-0601",
    status: "NEW",
  },
  {
    id: "APP-002",
    businessName: "Pacific Coast Autos",
    numberOfCars: 40,
    numberOfVehicles: 45,
    email: "apply@pacificcoast.com",
    phone: "(503) 555-0702",
    status: "NEW",
  },
  {
    id: "APP-003",
    businessName: "Green Lane Transport",
    numberOfCars: 8,
    numberOfVehicles: 10,
    email: "greenlane@transport.io",
    phone: "(617) 555-0803",
    status: "NEW",
  },
];
