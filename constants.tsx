
import { Asset, Unit, Category, UnitStatus, AuditLog } from './types';

export const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'Opus' },
  { id: '2', name: 'One by Omniyat' }
];

export const INITIAL_UNITS: Unit[] = [
  {
    id: 'u1',
    assetId: '1',
    assetName: 'Opus',
    unitNumber: '1B + 20',
    tradingName: 'Revolver',
    category: Category.FB,
    areas: {
      indoor: 10185,
      terrace: 0,
      mezzanine: 0,
      outdoor: 0,
      other: 0,
      total: 10185
    },
    permittedUse: 'Licensed Wood-fire restaurant',
    status: UnitStatus.OCCUPIED,
    currentTenant: 'Gunpowder Restaurant LLC',
    landlord: 'OPUS HM Limited & Andrei Kobzar',
    carParkAllocation: 3,
    comments: '2 months Base Rent waived (August & September 2025). Relief reflected via adjusted Q3 2025 cheque.',
    commercialTerms: {
      rcd: '26 Feb 2025',
      red: '25 Feb 2031',
      commencementDate: '15 Mar 2024',
      termDuration: '5 years',
      fitoutPeriod: '11 Months',
      rentFreePeriod: '7 months',
      securityDeposit: 283201,
      fitoutDeposit: 0,
      securityDepositPercent: 0.1,
      fitoutDepositPercent: 0
    },
    rentSchedule: [
      { id: 'rs1', year: 1, startDate: '2025-02-26', endDate: '2026-02-25', baseRent: 1200000, sqftRate: 117.82, torPercentage: 10 },
      { id: 'rs2', year: 2, startDate: '2026-02-26', endDate: '2027-02-25', baseRent: 1300000, sqftRate: 127.64, torPercentage: 10 }
    ],
    documents: [
      { id: 'd1', unitId: 'u1', type: 'Lease Agreement', date: '21 Mar 2024', status: 'Active', landlord: 'OPUS HM Limited', tenant: 'Gunpowder Restaurant LLC' },
      { id: 'd2', unitId: 'u1', type: 'Third Amendment', date: '08 Oct 2025', status: 'Active', landlord: 'OPUS HM Limited', tenant: 'Gunpowder Restaurant LLC' }
    ]
  },
  {
    id: 'u2',
    assetId: '1',
    assetName: 'Opus',
    unitNumber: '1A',
    tradingName: 'Maine',
    category: Category.FB,
    areas: {
      indoor: 4725,
      terrace: 0,
      mezzanine: 0,
      outdoor: 0,
      other: 0,
      total: 4725
    },
    permittedUse: 'Restaurant & Bar',
    status: UnitStatus.OCCUPIED,
    currentTenant: 'Water Grill Facilities Management',
    landlord: 'Opus HM Limited',
    carParkAllocation: 2,
    comments: '',
    commercialTerms: {
      rcd: 'Hotel Opening',
      red: 'Hotel Opening',
      commencementDate: '01 Jan 2023',
      termDuration: '3 years',
      fitoutPeriod: '6 Months',
      rentFreePeriod: '3 months',
      securityDeposit: 150000,
      fitoutDeposit: 50000,
      securityDepositPercent: 0.08,
      fitoutDepositPercent: 0.02
    },
    rentSchedule: [],
    documents: []
  }
];

export const INITIAL_LOGS: AuditLog[] = [
  { id: 'l1', timestamp: '30/01/2026 09:04:30 AM', activity: '69 records processed', status: 'Flagged', count: 18 },
  { id: 'l2', timestamp: '30/01/2026 09:04:29 AM', activity: '69 records processed', status: 'Flagged', count: 18 }
];
