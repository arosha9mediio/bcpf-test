export const scheduledMsg = (
  requestedDate: Date,
  scheduledDate: Date,
  username: string,
  category: string
) => {
  return `
    The collection of ${category} requested to be picked at ${requestedDate} has been rescheduled to be picked at ${scheduledDate}.
    `;
};

export const completedMsg = (username: string, category: string) => {
  return `
    The collection of ${category} has been successfuly delivered.
    `;
};

export const rejectedMsg = (
  requestedDate: Date,
  username: string,
  category: string,
  reason: string
) => {
  return `
    The request of collection of ${category} requested to be picked at ${requestedDate} has been rejected due to ${reason}.
    `;
};
