export const Directory = {
  baseDir: process.cwd(),
  storageDir: process.cwd() + (process.env.FOLDER || 'storage'),
  customerBaseDir: process.cwd() + (process.env.FOLDER || 'storage') + '/customer-bases',
};
