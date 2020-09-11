"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class LocalStorageDataProvider {
    load(key) {
        return new Promise((resolve) => {
            if (window.localStorage) {
                const item = localStorage.getItem(key);
                resolve(item || null);
            }
            resolve(null);
        });
    }
    remove(key) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const check = yield this.load(key);
            if (check === null) {
                resolve(false);
            }
            else {
                localStorage.removeItem(key);
                resolve(true);
            }
        }));
    }
    save(key, data) {
        return new Promise((resolve) => {
            localStorage.setItem(key, JSON.stringify(data));
            resolve(true);
        });
    }
}
exports.default = LocalStorageDataProvider;
//# sourceMappingURL=LocalStorageDataProvider.js.map