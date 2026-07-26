"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    const items = await Activity_1.default.find()
        .sort({ performedAt: -1 })
        .populate('user', 'name teamName')
        .lean();
    res.status(200).json({
        resource: 'activities',
        count: items.length,
        items,
    });
});
exports.default = activitiesRouter;
