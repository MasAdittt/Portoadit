
const ADMIN_UIDS = [
  '5xdoKdXHFQekkZjLFslH7DzMTyk2'
];

export const isAdmin = (uid) => {
  return ADMIN_UIDS.includes(uid);
};