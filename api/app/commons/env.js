const env = (key, defaultValue) => {
  const value = process.env[key];
  if (process.env.NODE_ENV === "testing") {
    const testValue = process.env[`${key}_TEST`];
    return typeof testValue === "undefined" ? value : testValue;
  }
  return value || defaultValue;
};

const envMongodbUri = (subject) => {
  const _subject = subject.toUpperCase();
  const credentials = mongodbCredentials(_subject);
  // HACK: We know these are mandaotory and no-empty
  const url = env(`${_subject}_MONGODB_URL`);
  const db = env(`${_subject}_MONGODB_DB`);
  return `mongodb://${credentials}${credentials === "" ? "" : "@"}${url}/${db}`;
};

const mongodbCredentials = (subject) => {
  const outcome = [
    env(`${subject}_MONGODB_USER`),
    env(`${subject}_MONGODB_PASSWORD`),
  ].join(":");
  return RegExp("^:|:$").test(outcome) ? "" : outcome;
};

module.exports = {
  env,
  envMongodbUri,
};
