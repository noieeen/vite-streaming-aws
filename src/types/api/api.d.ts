declare namespace API {
  type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

  interface RequestModel<PayloadType = Record<string, any>> {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    payload: PayloadType;
    xRequestId?: string;
    responseType?: ResponseType;
    signal?: AbortSignal;
  }

  interface ApiService {
    apiRequest: (model: RequestModel) => Promise<any>;
    apiFormRequest: (model: RequestModel) => Promise<any>;
  }
}
