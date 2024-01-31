export const hideEmail = (email: string) => {
  const [local, domain] = email.split('@');
  const visiblePart = local.slice(0, 1);
  const hiddenPart = '*'.repeat(local.length - 1);
  console.log(visiblePart, hiddenPart, domain);
  return `${visiblePart}${hiddenPart}@${domain}`;
};
