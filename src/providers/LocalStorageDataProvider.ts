import { IDataProvider } from "@feature-framework/core";

export default class LocalStorageDataProvider implements IDataProvider {
  load(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      if (window.localStorage) {
        const item = localStorage.getItem(key);
        resolve(item || null);
      }

      resolve(null);
    });
  }

  remove(key: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const check = await this.load(key);
      if (check === null) {
        resolve(false);
      } else {
        localStorage.removeItem(key);
        resolve(true);
      }
    });
  }

  save(key: string, data: unknown): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(data));
      resolve(true);
    });
  }
}
