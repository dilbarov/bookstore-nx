import FingerprintJS, { GetResult, UnknownComponents } from '@fingerprintjs/fingerprintjs';

export const getFingerprint = async (): Promise<GetResult> => {
  const fp = await FingerprintJS.load();
  return await fp.get();
};

export const getVisitorId = async (): Promise<string> => {
  const fingerprint = await getFingerprint();
  const { cpuClass, osCpu, vendor, platform, vendorFlavors, timezone } = fingerprint.components;
  const _components = { cpuClass, osCpu, vendor, platform, vendorFlavors, timezone } as unknown;
  return FingerprintJS.hashComponents(_components as UnknownComponents);
};
