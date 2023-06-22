import axios from "../../libs/axios/axios";
// import authService from '../authentication';

const apiService: API.ApiService = {
  apiRequest(model: API.RequestModel) {
    return new Promise((resolve, reject) => {
      axios(apiUtilities.buildPayload(model))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          const error = err.response || err;
          return reject(error);
        });
    });
  },
  apiFormRequest(model: API.RequestModel) {
    return new Promise((resolve, reject) => {
      axios(
        apiUtilities.buildPayload({
          ...model,
          ...{
            payload: apiUtilities.calculateFormDataObject(model.payload) || {},
          },
        })
      )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          const error = err.response || err;

          return reject(error);
        });
    });
  },
};

const apiUtilities = {
  buildPayload(model: API.RequestModel) {
    return {
      method: model.method.toLowerCase(),
      url: model.endpoint,
      headers: {
        Authorization: "Bearer ", // + authService.fetchTokenByBrand(),
        ["X-Request-Id"]: model?.xRequestId || "",
      },
      [model.method == "GET" ? "params" : "data"]: model.payload,
      responseType: model?.responseType,
      signal: model?.signal,
    };
  },
  calculateFormDataObject(
    ObjectData?: Record<string, any>,
    Path?: Array<any>,
    FormDataObj?: FormData
  ): FormData | null {
    let FormDataBase = FormDataObj || new FormData();

    if (ObjectData instanceof File) {
      let PathObj = Path != null ? JSON.parse(JSON.stringify(Path)) : [];
      FormDataBase.append(PathObj.join("."), ObjectData);
    } else if (Array.isArray(ObjectData)) {
      for (var F = 0; F < ObjectData.length; F++) {
        let PathObj = Path != null ? JSON.parse(JSON.stringify(Path)) : [];
        PathObj[PathObj.length - 1] =
          PathObj[PathObj.length - 1] + "[" + F + "]";
        FormDataBase =
          this.calculateFormDataObject(ObjectData[F], PathObj, FormDataBase) ||
          FormDataBase;
      }
    } else if (typeof ObjectData === "function" && ObjectData != null) {
      return null;
    } else if (typeof ObjectData === "object" && ObjectData != null) {
      for (var Key in ObjectData) {
        if (ObjectData.hasOwnProperty(Key)) {
          let PathObj = Path != null ? JSON.parse(JSON.stringify(Path)) : [];
          PathObj.push(Key);
          FormDataBase =
            this.calculateFormDataObject(
              ObjectData[Key],
              PathObj,
              FormDataBase
            ) || FormDataBase;
        }
      }
    } else if (ObjectData != null) {
      let PathObj = Path != null ? JSON.parse(JSON.stringify(Path)) : [];
      FormDataBase.append(PathObj.join("."), ObjectData);
    }
    return FormDataBase;
  },
};

export default apiService;
