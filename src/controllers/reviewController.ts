import { Request, Response } from "express";
import { getAllReviews, addReview, getReviewbySchoolId, getReviewById, updatetReviewById } from "../services/review";
import { getSchoolById, updateSchoolRating } from "../services/school";
import { Db, WithId } from "mongodb";
import { loggerTimestamp } from "../utils/utils";
import jwt from "jsonwebtoken";
import { secretKey } from "../configs/envInit";
import { ReviewModel } from "../models/dataModel";

export async function getReviewsController(req: Request, res: Response) {
    try {
        const reviews = await getAllReviews(req.db as Db); // You'll need to implement the `getAllReviews` function.
        loggerTimestamp("Reviews fetched successfully");
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    } catch (error) {
        loggerTimestamp("An error occurred while fetching Reviews: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching Reviews",
        });
    }
}

export async function getReviewsBySchoolController(req: Request, res: Response) {
    try {
        const schoolId = req.params.schoolId
        const reviews = await getReviewbySchoolId(schoolId, req.db as Db); // You'll need to implement the `getAllReviews` function.
        loggerTimestamp("Reviews fetched successfully");
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    } catch (error) {
        loggerTimestamp("An error occurred while fetching Reviews: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching Reviews",
        });
    }
}

export async function addReviewController(req: Request, res: Response) {
    try {
        const token = req.headers.authorization?.split(' ')[1]!;
        const schoolId = req.params.schoolId
        const { rating, comment} = req.body;
        const status = "pending"
        loggerTimestamp("adding review")

        const schoolExist = await getSchoolById(schoolId, req.db as Db)

        if (!schoolExist) {
            loggerTimestamp("Add school review failed: School doesn't exists on database");
            return res.status(404).json({
                success: false,
                message: "School doesn't exist: please add the school first."
            });
        }

        const decodedToken = jwt.verify(token, secretKey) as {id: string};
        const userId = decodedToken.id
        const newReview = {
            schoolId,
            userId,
            rating: {
                reputation: rating.reputation,
                location: rating.location,
                facilities: rating.facilities
            },
            comment,
            status
        };

        await addReview(newReview, req.db as Db);
        const reviews = await getAllReviews(req.db as Db);
        
        const reviewModels: ReviewModel[] = reviews.map((review) => ({
            _id: review._id.toString(), 
            schoolId: review.schoolId,
            userId: review.userId,
            rating: {
                reputation: review.rating.reputation,
                location: review.rating.location,
                facilities: review.rating.facilities,
            },
            comment: review.comment,
            status: review.status,
        }));

        await updateSchoolRating(schoolId, reviewModels, req.db as Db);

        loggerTimestamp("Review added successfully");
        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: {
                schoolId: newReview.schoolId,
                userId: newReview.userId,
                rating: {
                    reputation: newReview.rating.reputation,
                    location: newReview.rating.location,
                    facilities: newReview.rating.facilities
                },
                comment,
                status: newReview.status
            }
        });
    } catch (error) {
        loggerTimestamp("An error occurred while adding review: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding review",
        });
    }
}

export async function approveReviewController(req: Request, res: Response) {
	try {
		const reviewId = req.params.reviewId;
        const status = "approved" 
        
		const reviewExist = await getReviewById(reviewId, req.db as Db);

		if (!reviewExist) {
			loggerTimestamp("Approving review status failed: review doesnt exist");
			return res.status(404).json({
				success: false,
				message: "Review doesnt exist",
			});
		}

		const updateField: any = {};
		if (status) {
			updateField.status = status
		}
		

		await updatetReviewById(reviewId, updateField, req.db as Db);
		

		res.status(200).json({
			succes: true,
			message: "Succesfully approving the review",
		});



	} catch (error) {
		loggerTimestamp("An error occurred during updating school: " + error);
		res.status(500).json({
			success: false,
			message: "An error occurred during approving the review",
		});
	}
}

export async function rejectReviewController(req: Request, res: Response) {
	try {
		const reviewId = req.params.reviewId;
        const status = "rejected"
        
		const reviewExist = await getReviewById(reviewId, req.db as Db);

		if (!reviewExist) {
			loggerTimestamp("Rejecting review status failed: review doesnt exist");
			return res.status(404).json({
				success: false,
				message: "Review doesnt exist",
			});
		}

		const updateField: any = {};
		if (status) {
			updateField.status = status
		}
		

		await updatetReviewById(reviewId, updateField, req.db as Db);
		

		res.status(200).json({
			succes: true,
			message: "Succesfully rejecting a review",
		});



	} catch (error) {
		loggerTimestamp("An error occurred during rejecting a review " + error);
		res.status(500).json({
			success: false,
			message: "An error occurred during rejecting a review",
		});
	}
}