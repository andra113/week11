import { Request, Response } from "express";
import { getAllReviews, addReview } from "../services/review";
import { getSchoolById } from "../services/school";
import { Db } from "mongodb";
import { loggerTimestamp } from "../utils/utils";
import jwt from "jsonwebtoken";
import { secretKey } from "../configs/envInit";

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

export async function addReviewController(req: Request, res: Response) {
    try {
        const token = req.headers.authorization?.split(' ')[1]!;
        const schoolId = req.params.schoolId
        const { rating, comment} = req.body;
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
            comment
        };

        // Assuming you have an addReview function to add the review to your database
        await addReview(newReview, req.db as Db);

        loggerTimestamp("Review added successfully");
        console.log(newReview)
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
                comment
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