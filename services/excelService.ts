
import { Unit } from '../types';

declare const XLSX: any;

export const exportUnitsToExcel = (units: Unit[]) => {
  const flatData = units.map(u => ({
    'Asset': u.assetName,
    'Unit #': u.unitNumber,
    'Trading Name': u.tradingName,
    'Category': u.category,
    'Total Area': u.areas.total,
    'Tenant': u.currentTenant,
    'Status': u.status,
    'RCD': u.commercialTerms.rcd,
    'RED': u.commercialTerms.red,
    'Security Deposit': u.commercialTerms.securityDeposit
  }));

  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Units");
  XLSX.writeFile(workbook, `Omniyat_Portfolio_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const parseExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
