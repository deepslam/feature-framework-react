"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@feature-framework/core");
class TestFeature extends core_1.Feature {
    constructor() {
        super(...arguments);
        this.name = "TestFeature";
        this.events = {
            onCustomUpdate: new core_1.Event(),
        };
    }
    initFeature() {
        return new Promise((resolve) => resolve(true));
    }
}
exports.default = TestFeature;
//# sourceMappingURL=TestFeature.js.map