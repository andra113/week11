import { Db, ObjectId } from "mongodb";
import { ReviewModel, SchoolModel } from "../models/dataModel";
import { getReviewbySchoolId } from "./review";

export async function getAllSchool(db: Db) {
	const schoolCollection = db.collection("schools");
	const schools = await schoolCollection.find().toArray();
	return schools;
}

export async function addSchool(newSchool: SchoolModel, db: Db) {
	const schoolCollection = db.collection("schools");
	const newSchoolAdded = await schoolCollection.insertOne(newSchool);
	return newSchoolAdded;
}

export async function getSchoolById(id: string, db: Db) {
	const schoolCollection = db.collection("schools");
	const schoolResult = await schoolCollection.findOne({
		_id: new ObjectId(id),
	});
	return schoolResult;
}

export async function deletSchoolById(id: string, db: Db) {
	const schoolCollection = db.collection("schools");
	const schoolResult = await schoolCollection.findOneAndDelete({
		_id: new ObjectId(id),
	});
	return schoolResult;
}

export async function getSchoolByName(name: string, db: Db) {
	const schoolCollection = db.collection("schools");
	const schoolResult = await schoolCollection.findOne({ name: name });
	return schoolResult;
}

export async function updatetSchoolById(id: string, updateField: any, db: Db) {
	const schoolCollection = db.collection("schools");
	const setField: any = {};
	for (const key in updateField) {
		setField[key] = updateField[key];
	}
	const schoolResult = await schoolCollection.updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: setField,
		}
	);
	return schoolResult;
}

export function updateSchoolRating(schoolId: string, reviews: ReviewModel[], db: Db
) {
	const schoolCollection = db.collection("schools");

	const schoolReviews = reviews.filter(
		(review) => review.schoolId === schoolId
	);

	const totalReviews = schoolReviews.length;
	const averageRating = schoolReviews.reduce(
		(acc, review) => {
			acc.reputation += review.rating.reputation;
			acc.location += review.rating.location;
			acc.facilities += review.rating.facilities;
			return acc;
		},
		{ reputation: 0, location: 0, facilities: 0 }
	);

	if (totalReviews > 0) {
		averageRating.reputation /= totalReviews;
		averageRating.location /= totalReviews;
		averageRating.facilities /= totalReviews;
	}

	const result = schoolCollection.updateOne(
		{ _id: new ObjectId(schoolId) },
		{
			$set: {
				"rating.reputation": averageRating.reputation,
				"rating.location": averageRating.location,
				"rating.facilities": averageRating.facilities,
			},
		}
	);

	return result;
}
