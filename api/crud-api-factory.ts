import requestMethods from './request-methods';

interface CrudOperation {
  method: (typeof requestMethods)[keyof typeof requestMethods]; // Represents one of the request methods (get, post, put, delete)
  path: (...args: any[]) => string; // A function to generate the path
  okMessage: string;
}

export interface CrudApi {
  getEntityList: CrudOperation;
  createEntity: CrudOperation;
  updateEntity: CrudOperation;
  removeEntity: CrudOperation;
}

export const CrudApiFactory = (type: string, entityName: string): CrudApi => ({
  getEntityList: {
    method: requestMethods.get,
    path: () => `/${type}/${entityName}/list`,
    okMessage: `${entityName} are fetched`,
  },
  createEntity: {
    method: requestMethods.post,
    path: () => `/${type}/${entityName}`,
    okMessage: `${entityName} is created`,
  },
  updateEntity: {
    method: requestMethods.put,
    path: () => `/${type}/${entityName}`,
    okMessage: `${entityName} is updated`,
  },
  removeEntity: {
    method: requestMethods.delete,
    path: (id: string) => `/${type}/${entityName}?id=${id}`,
    okMessage: `${entityName} is removed`,
  },
});
