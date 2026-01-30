
export enum Category {
  RETAIL = 'Retail',
  FB = 'F&B',
  OTHER = 'Other'
}

export enum UnitStatus {
  OCCUPIED = 'Occupied',
  VACANT = 'Vacant',
  UNDER_OFFER = 'Under Offer'
}

export interface AreaBreakdown {
  indoor: number;
  terrace: number;
  mezzanine: number;
  outdoor: number;
  other: number;
  total: number;
}

export interface RentScheduleItem {
  id: string;
  year: number;
  startDate: string;
  endDate: string;
  baseRent: number;
  sqftRate: number;
  torPercentage: number;
}

export interface CommercialTerms {
  rcd: string; // Rent Commencement Date
  red: string; // Rent End Date
  commencementDate: string;
  termDuration: string;
  fitoutPeriod: string;
  rentFreePeriod: string;
  securityDeposit: number;
  fitoutDeposit: number;
  securityDepositPercent: number;
  fitoutDepositPercent: number;
}

export interface DocumentEntry {
  id: string;
  unitId: string;
  type: string;
  date: string;
  landlord: string;
  tenant: string;
  status: 'Active' | 'Expired' | 'Pending';
  fileName?: string;
  fileData?: string; // Base64
}

export interface Unit {
  id: string;
  assetId: string;
  assetName: string;
  unitNumber: string;
  tradingName: string;
  category: Category;
  areas: AreaBreakdown;
  permittedUse: string;
  status: UnitStatus;
  currentTenant: string;
  landlord: string;
  carParkAllocation: number;
  comments: string;
  commercialTerms: CommercialTerms;
  rentSchedule: RentScheduleItem[];
  documents: DocumentEntry[];
}

export interface Asset {
  id: string;
  name: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  activity: string;
  status: 'Success' | 'Flagged' | 'Warning';
  count?: number;
}

export interface AppState {
  units: Unit[];
  assets: Asset[];
  auditLogs: AuditLog[];
}
