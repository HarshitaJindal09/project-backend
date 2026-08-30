class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],   // This is for storing additional/multiple error details.
        stack = ""     // A stack trace tells you where the error happened in your code.
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
            // helps your custom error have a useful stack trace.
        }

    }
}

export {ApiError}