"use strict";

const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

const ok = (res) => (data) => {
  const statusCode = !data || (Array.isArray(data) && !data.length) ? 204 : 200;
  sendResponse(res, statusCode, data);
};
const created = (res) => (data) => sendResponse(res, 201, data);
const accepted = (res) => (data) => sendResponse(res, 202, data);
const nodata = (res) => (data) => sendResponse(res, 204, data);
const notFound = (res) => (data) => sendResponse(res, 404, data);
const badRequest = (res) => (data) => sendResponse(res, 400, data);
const fail = (res) => (error) => {
  console.log("error", error);
  sendResponse(res, 500, error);
};
const unAuthorized = (res) => (error) => sendResponse(res, 401, error);
const notImplemented = (res) => (data = "") => sendResponse(res, 501, data);

module.exports = {
  ok,
  created,
  accepted,
  nodata,
  notFound,
  fail,
  unAuthorized,
  notImplemented,
  badRequest,
};
