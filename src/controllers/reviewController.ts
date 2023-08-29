import { Request, Response } from "express";
import { getAllReviews, addReview } from "../services/review";
import { Db } from "mongodb";
import { loggerTimestamp } from "../utils/utils";

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
        const { schoolId, rating, comment} = req.body;

        // You might want to perform validation and error checking here

        const newReview = {
            schoolId,
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
        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: newReview,
        });
    } catch (error) {
        loggerTimestamp("An error occurred while adding review: " + error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding review",
        });
    }
}