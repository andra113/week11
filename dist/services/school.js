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
exports.updateSchoolRating = exports.updatetSchoolById = exports.getSchoolByName = exports.deletSchoolById = exports.getSchoolById = exports.addSchool = exports.getAllSchool = void 0;
const mongodb_1 = require("mongodb");
function getAllSchool(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const schoolCollection = db.collection("schools");
        const schools = yield schoolCollection.find().toArray();
        return schools;
    });
}
exports.getAllSchool = getAllSchool;
function addSchool(newSchool, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const schoolCollection = db.collection("schools");
        const newSchoolAdded = yield schoolCollection.insertOne(newSchool);
        return newSchoolAdded;
    });
}
exports.addSchool = addSchool;
function getSchoolById(id, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const schoolCollection = db.collection("schools");
        const schoolResult = yield schoolCollection.findOne({
            _id: new mongodb_1.ObjectId(id),
        });
        return schoolResult;
    });
}
exports.getSchoolById = getSchoolById;
function deletSchoolById(id, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const schoolCollection = db.collection("schools");
        const schoolResult = yield schoolCollection.findOneAndDelete({
            _id: new mongodb_1.ObjectId(id),
        });
        return schoolResult;
    });
}
exports.deletSchoolById = deletSchoolById;
function getSchoolByName(name, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const schoolCollection = db.collection("schools");
        const schoolResult = yield schoolCollection.findOne({ name: name });
        return schoolResult;
    });
}
exports.getSchoolByName = getSchoolByName;
function updatetSchoolById(id, updateField, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const schoolCollection = db.collection("schools");
        const setField = {};
        for (const key in updateField) {
            setField[key] = updateField[key];
        }
        const schoolResult = yield schoolCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: setField,
        });
        return schoolResult;
    });
}
exports.updatetSchoolById = updatetSchoolById;
function updateSchoolRating(schoolId, reviews, db) {
    const schoolCollection = db.collection("schools");
    const schoolReviews = reviews.filter((review) => review.schoolId === schoolId);
    const totalReviews = schoolReviews.length;
    const averageRating = schoolReviews.reduce((acc, review) => {
        acc.reputation += review.rating.reputation;
        acc.location += review.rating.location;
        acc.facilities += review.rating.facilities;
        return acc;
    }, { reputation: 0, location: 0, facilities: 0 });
    if (totalReviews > 0) {
        averageRating.reputation /= totalReviews;
        averageRating.location /= totalReviews;
        averageRating.facilities /= totalReviews;
    }
    const result = schoolCollection.updateOne({ _id: new mongodb_1.ObjectId(schoolId) }, {
        $set: {
            "rating.reputation": averageRating.reputation,
            "rating.location": averageRating.location,
            "rating.facilities": averageRating.facilities,
        },
    });
    return result;
}
exports.updateSchoolRating = updateSchoolRating;
