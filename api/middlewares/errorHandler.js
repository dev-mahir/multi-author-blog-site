


// create express error handler 
const errorHandler = (error, req, res, next ) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Unkwon errors";

    return res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    })
}

export default errorHandler;