export function validateQr(scannedText: string): boolean {
  if (!scannedText) {
    return false;
  }

  const textSegments: Array<string> = scannedText.split('-');

  if (textSegments.length !== 3) {
    return false;
  }

  if (textSegments[0] !== 'bonprofit') {
    return false;
  }

  return true;
}
