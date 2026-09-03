import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {   // _ === res
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //First try to get the token from the cookie. If it isn't there, try the Authorization header.
        // This makes your API flexible because the client can authenticate using either method.
        // Bearer word is just a standard way of saying: The value following this is the authentication token.
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
            // The user has not provided valid authentication credentials.
        }
    
        // jwt.verify() checks whether the token is valid.
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")

        }
    
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})