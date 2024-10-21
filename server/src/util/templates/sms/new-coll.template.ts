export const newCollTemplate = (
  company_name: string,
  category: string,
  requestedDate: Date,
  amount: number,
  unit: string,
  admin_name = 'admin',
  partner_name?: string
): string => {
  return `
    A new ${category} collection of ${amount} ${unit} request has been received from ${company_name} to be picked at ${requestedDate}.
    `;
};
