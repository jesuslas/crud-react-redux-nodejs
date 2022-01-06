
import MultiSelect from "./Select/MultiSelect";
import SelectItems from "./Select/SelectItems";
import Errors from "./errors/Errors";
import RenderLoading from "./loading/loading";
import ResponseError from "./loading/loading";
import CustomPagination from "./loading/loading";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import EleccionButton from "./button/EleccionButton";
import {responseError} from "./errors/utils.errors";
import ContCenter from "./Layouts/ContCenter";
export * from "./urils.commons";
export * from "./utils.auth";
export {
    EleccionButton,
    ResponseError,
    responseError,
    MultiSelect,
    SelectItems,
    Errors,
    RenderLoading,
    CustomPagination,
    ConfirmDialog,
    ContCenter
   
  };