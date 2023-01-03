"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScratchSchema = new mongoose_1.Schema({
    targets: {
        type: Array,
        default: []
    },
    monitors: {
        type: Array,
        default: []
    },
    extensions: {
        type: Array,
        default: []
    },
    meta: {
        type: Object,
        default: {}
    },
}, {
    minimize: false,
    timestamps: true
});
const Scratch = (0, mongoose_1.model)("Scratch", ScratchSchema);
exports.default = Scratch;
//# sourceMappingURL=Scratch.js.map