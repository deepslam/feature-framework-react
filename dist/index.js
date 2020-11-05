"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectApp = exports.AppContext = exports.AppProvider = exports.ReactView = exports.LocalStorageDataProvider = void 0;
const LocalStorageDataProvider_1 = __importDefault(require("./providers/LocalStorageDataProvider"));
exports.LocalStorageDataProvider = LocalStorageDataProvider_1.default;
const AppProvider_1 = require("./providers/AppProvider");
Object.defineProperty(exports, "AppProvider", { enumerable: true, get: function () { return AppProvider_1.AppProvider; } });
Object.defineProperty(exports, "AppContext", { enumerable: true, get: function () { return AppProvider_1.AppContext; } });
const connectApp_1 = require("./hooks/connectApp");
Object.defineProperty(exports, "connectApp", { enumerable: true, get: function () { return connectApp_1.connectApp; } });
const ReactView_1 = __importDefault(require("./views/ReactView"));
exports.ReactView = ReactView_1.default;
//# sourceMappingURL=index.js.map