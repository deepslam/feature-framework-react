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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectModel = void 0;
const react_1 = __importStar(require("react"));
function connectModel(callback, Component, model) {
    const Hoc = (ownProps) => {
        const [props, setProps] = react_1.useState(callback(model, ownProps));
        const ref = react_1.default.useRef(props);
        const updateProps = () => {
            setProps(Object.assign({}, callback(model, ownProps)));
        };
        react_1.useEffect(() => {
            updateProps();
        }, Object.values(ownProps));
        react_1.useEffect(() => {
            ref.current = props;
            Object.keys(model.baseEvents).forEach((eventName) => {
                model.baseEvents[eventName].subscribe(updateProps);
            });
            return () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref.current = false;
                Object.keys(model.baseEvents).forEach((eventName) => {
                    model.baseEvents[eventName].unsubscribe(updateProps);
                });
            };
        });
        return react_1.default.createElement(Component, Object.assign({}, props));
    };
    return Hoc;
}
exports.connectModel = connectModel;
//# sourceMappingURL=connectModel.js.map