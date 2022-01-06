import Api from "./api.service";
import { getModelFetch, postModelFetch, patchModelFetch } from "./api.service";
import { responseError } from "../components/commons/errors/utils.errors";

export const createOrEdit = async ({
  API = "PawiisApi",
  MODEL,
  values,
  setLoading,
  properties,
  customHandler,
  setErrors,
  search,
  updatePost,
  addPost
}) => {
  try {
    const ApiService = new Api(API);
    setLoading(true);
    let res = null;
    if (values.id) {
      res = await ApiService.edit(MODEL, values.id, properties, {
        params: search
      });
      updatePost(values.id, properties)
    } else {
      res = await ApiService.create(MODEL, properties, { params: search });
      res = await res.json();
      addPost(res);
    }
    setLoading(false);
    console.log('res', res);
    if (res.id || res.status === 200 || res.statusCode === 200) {
      customHandler && customHandler(res);
    }
  } catch (error) {
    setLoading(false);
    setErrors(responseError(error));
  }
};
export const getData = async ({
  API = "PawiisApi",
  MODEL,
  id,
  setLoading,
  customHandler,
  customErrorsHandler,
  setErrors,
  type,
  search,
  setShowAlert
}) => {
  try {
    const ApiService = new Api(API);
    setLoading && setLoading(true);
    let res = await ApiService.get(MODEL, {
      ...(search && { params: search }),
      ...(id && { id })
    });
    if (
      res &&
      (res.id ||
        res.status === 200 )
    ) {
      customHandler && customHandler(await res.json());
    } else {
      customHandler && customHandler([]);
    }

    setLoading && setLoading(false);
    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    setLoading && setLoading(false);
    setErrors && setErrors(responseError(error));
    customErrorsHandler && customErrorsHandler();
    setShowAlert &&
      setShowAlert({
        open: true,
        message: error.message,
        type: "error"
      });
  }
};
export const getDataFetch = async ({
  MODEL,
  id,
  setLoading,
  customHandler,
  customErrorsHandler,
  setErrors,
  search,
  setShowAlert
}) => {
  try {
    setLoading && setLoading(true);
    let res = await getModelFetch(MODEL, {
      ...(search && { params: search }),
      ...(id && { id })
    });
    res = await res.json();
    if (
      res &&
      (res.data || res.id || res.status === 200 || res.length || res.rows)
    ) {
      customHandler && customHandler(res);
    } else {
      customHandler && customHandler([]);
    }
    setLoading && setLoading(false);
    return res;
  } catch (error) {
    setLoading && setLoading(false);
    setErrors && setErrors(responseError(error));
    customErrorsHandler && customErrorsHandler();
    setShowAlert &&
      setShowAlert({
        open: true,
        message: error.message,
        type: "error"
      });
  }
};
export const createOrEditFecth = async ({
  MODEL,
  values,
  setLoading,
  properties,
  customHandler,
  setErrors
}) => {
  try {
    setLoading(true);
    let res = null;
    if (values.id) {
      res = await patchModelFetch(MODEL)(values.id, properties);
    } else {
      res = await postModelFetch(MODEL)(properties);
    }
    setLoading(false);
    if (res.id || res.status === 200 || res.ok) {
      customHandler && customHandler(res);
    }
    if (res.status === 409) {
      throw new Error("Esta hora ya no esta disponible.");
    }
  } catch (error) {
    setLoading(false);
    setErrors(responseError(error));
  }
};
export const deleteData = async ({
  API = "PawiisApi",
  MODEL,
  id,
  setLoading,
  customHandler,
  setErrors
}) => {
  try {
    const ApiService = new Api(API);
    setLoading(true);
    let res = null;
    res = await ApiService.delete(MODEL, id);
    setLoading(false);
    if (res) {
      customHandler && customHandler(res);
    }
  } catch (error) {
    setLoading(false);
    setErrors && setErrors(responseError(error));
  }
};
