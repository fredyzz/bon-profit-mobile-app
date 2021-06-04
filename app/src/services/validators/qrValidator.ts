export interface Scan {
  success: boolean;
  restaurantId: string | null;
  tableId: string | null;
}

export function validateQr(scannedText: string): Scan {
  const scan: Scan = {
    success: false,
    restaurantId: null,
    tableId: null,
  };

  if (!scannedText) {
    return scan;
  }

  const textSegments: Array<string> = scannedText.split('-');

  if (textSegments.length !== 3) {
    return scan;
  }

  if (textSegments[0] !== 'bonprofit') {
    return scan;
  }

  scan.success = true;
  scan.restaurantId = textSegments[1];
  scan.tableId = textSegments[2];

  return scan;
}
