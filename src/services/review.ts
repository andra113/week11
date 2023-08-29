import { Db, ObjectId } from "mongodb";
import { ReviewModel } from "../models/dataModel";

export async function getAllReviews(db: Db) {
	const reviewCollection = db.collection("reviews");
	const reviews = await reviewCollection.find().toArray();
	return reviews;
}

export async function addReview(newReview: ReviewModel, db: Db) {
	const reviewCollection = db.collection("reviews");
	const newReviewAdded = await reviewCollection.insertOne(newReview);
	return newReview;
}