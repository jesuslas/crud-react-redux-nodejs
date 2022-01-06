import { baseUrl } from "../config/config";
import store from "../redux/index.js";

const setParameters = (url, params) => {
  let withToken = `${url}`;
  let { user } = store.getState();
  let { loginLikeABossId } = user || {};
  if (params && Object.keys(params).length) {
    const queryParams = Object.keys(params).reduce(
      (par, key) => (par += `&${key}=${params[key]}`),
      `?${!loginLikeABossId ? "" : "loginLikeABossId=" + loginLikeABossId}`
    );
    let buff = new Buffer(queryParams);
    let encodedQueryParams = buff.toString("base64");
    withToken = withToken + `?query=${encodedQueryParams}`;
  } else if (loginLikeABossId) {
    let params = `?${
      !loginLikeABossId ? "" : "loginLikeABossId=" + loginLikeABossId
    }`;
    let buff = new Buffer(params);
    let encodedQueryParams = buff.toString("base64");
    withToken = withToken + `?query=${encodedQueryParams}`;
    return withToken;
  }
  return withToken;
};


const getFetch = async (model, options) => {
  const { id, params } = options || {};
  try {
    return await fetch(
      setParameters(`${baseUrl}${model}${id ? "/" + id : ""}`, params)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return { data: [] };
  }
};
const postFetch = model => async body => {
  try {
    return await fetch(`${baseUrl}/${model}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return { data: [] };
  }
};
const patchFetch = model => async (id, body) => {
  try {
    return await fetch(`${baseUrl}/${model}${id ? "/" + id : ""}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return { data: [] };
  }
};
const delFetch = model => async (id, body) => {
  try {
    return await fetch(`${baseUrl}/${model}${id ? "/" + id : ""}`, {
      method: "DELETE"
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return { data: [] };
  }
};


export const getModel = getFetch;
export const getModelFetch = getFetch;
export const postModelFetch = postFetch;
export const patchModelFetch = patchFetch;
export const delModel = delFetch;
export const createModel = postFetch;

export const editModel = (model, options = {}) => (id, properties) => {
  return patchFetch(model, options)(id, properties);
};





export default class Api {
  API = null;
  constructor(API) {
    this.API = API;
  }
  async get(model, options) {
    const { id, params } = options || {};
    try {
      return await getFetch(`/${model}${id ? "/" + id : ""}`, params) 
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error", error.toJSON());
      return { data: [], error };
    }
  }

  edit(model, id, properties, options = {}) {
    return patchFetch(model)(id, properties)
  }

  create(model, properties, options = {}) {
    return postFetch(model)(properties)
  }
  delete(model, itemId) {
    return delFetch(model)(itemId);
  }
}
