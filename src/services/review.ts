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

export async function getReviewById(id: string, db: Db) {
	const reviewCollection = db.collection("review");
	const reviewResult = await reviewCollection.findOne({ _id: new ObjectId(id) });
	return reviewResult;
}

export async function deletReviewById(id: string, db: Db) {
	const reviewCollection = db.collection("reviews");
	const reviewResult = await reviewCollection.findOneAndDelete({ _id: new ObjectId(id) });
	return reviewResult;
}

export async function updatetReviewById(id: string, updateField: any, db: Db) {
	const reviewCollection = db.collection("reviews");
	const setField: any = {};
	for (const key in updateField) {
		setField[key] = updateField[key];
	}
	const reviewResult = await reviewCollection.updateOne({ _id: new ObjectId(id) },
		{
			$set: setField
		});
	return reviewResult;
}

