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
exports.updatetReviewById = exports.deletReviewById = exports.getReviewbySchoolId = exports.getReviewById = exports.addReview = exports.getAllReviews = void 0;
const mongodb_1 = require("mongodb");
function getAllReviews(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewCollection = db.collection("reviews");
        const reviews = yield reviewCollection.find().toArray();
        return reviews;
    });
}
exports.getAllReviews = getAllReviews;
function addReview(newReview, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewCollection = db.collection("reviews");
        const newReviewAdded = yield reviewCollection.insertOne(newReview);
        return newReview;
    });
}
exports.addReview = addReview;
function getReviewById(id, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewCollection = db.collection("reviews");
        const reviewResult = yield reviewCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        return reviewResult;
    });
}
exports.getReviewById = getReviewById;
function getReviewbySchoolId(schoolId, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewCollection = db.collection("reviews");
        const reviewResult = yield reviewCollection.find({ schoolId: schoolId }).toArray();
        console.log(schoolId);
        console.log(reviewResult);
        return reviewResult;
    });
}
exports.getReviewbySchoolId = getReviewbySchoolId;
function deletReviewById(id, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewCollection = db.collection("reviews");
        const reviewResult = yield reviewCollection.findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
        return reviewResult;
    });
}
exports.deletReviewById = deletReviewById;
function updatetReviewById(id, updateField, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewCollection = db.collection("reviews");
        const setField = {};
        for (const key in updateField) {
            setField[key] = updateField[key];
        }
        const reviewResult = yield reviewCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: setField
        });
        return reviewResult;
    });
}
exports.updatetReviewById = updatetReviewById;
