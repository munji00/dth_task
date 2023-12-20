import { Request, Response, NextFunction } from "express";

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
	// if no status or message in error use default 500 code and message
	const statusCode = 500;
	const message = err.message || "Something went wrong.";

	// returns error status code and message
	return res.status(statusCode).json({
		error: statusCode,
		message: message
	})
}