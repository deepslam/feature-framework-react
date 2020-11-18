"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectCollection = void 0;
const react_1 = __importStar(require("react"));
function connectCollection(callback, Component) {
    const Hoc = (collection) => {
        const [props, setProps] = react_1.useState(callback(collection));
        const val = react_1.default.useRef(props);
        const updateProps = () => {
            setProps(Object.assign({}, callback(collection)));
        };
        react_1.useEffect(() => {
            val.current = props;
            Object.keys(collection.events).forEach((eventName) => {
                collection.events[eventName].subscribe(() => {
                    updateProps();
                });
            });
            return () => {
                Object.keys(collection.events).forEach((eventName) => {
                    collection.events[eventName].unsubscribe(updateProps);
                });
            };
        });
        react_1.useEffect(() => () => {
            Object.keys(collection.events).forEach((eventName) => {
                collection.events[eventName].unsubscribe(updateProps);
            });
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Component, Object.assign({}, props))));
    };
    return Hoc;
}
exports.connectCollection = connectCollection;
//# sourceMappingURL=connectCollection.js.map