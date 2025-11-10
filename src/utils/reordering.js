export const parseColumnIndex = (index) => {
  const result = parseInt(index?.replace(/.*c(\d+)/g, "$1"), 10);
  return Number.isFinite(result) ? result : null;
};

export const parseTaskId = (index) => {
  const result = parseInt(index?.replace(/^t(\d+)c\d+/g, "$1"), 10);
  return Number.isFinite(result) ? result : null;
};
