"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApp = void 0;
const react_1 = require("react");
const AppProvider_1 = require("../providers/AppProvider");
const useApp = () => {
    return react_1.useContext(AppProvider_1.AppContext);
};
exports.useApp = useApp;
//# sourceMappingURL=useApp.js.map