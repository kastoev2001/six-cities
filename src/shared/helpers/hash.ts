import * as crypto from 'node:crypto';

export const createHMAC256 = (line: string, salt: string): string => {
  const shaHacher = crypto.createHmac('SHA256', line);
  return shaHacher.update(salt).digest('hex');
};
