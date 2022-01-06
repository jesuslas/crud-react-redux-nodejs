const crypt64 = (data) => {
  const buffer = Buffer.from(data);
  return buffer.toString("base64");
};

const uncrypt64 = (data) => {
  const buffer = Buffer.from(data, "base64");
  return buffer.toString("ascii");
};

module.exports = {
  crypt64,
  uncrypt64,
};
