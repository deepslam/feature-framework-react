import { IDataProvider } from "@feature-framework/core";
export default class LocalStorageDataProvider implements IDataProvider {
    load(key: string): Promise<string | null>;
    remove(key: string): Promise<boolean>;
    save(key: string, data: unknown): Promise<boolean>;
}
