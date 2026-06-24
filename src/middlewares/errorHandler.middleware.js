const errorHandler = (err, req, res, next) => {
    console.error(err);
    const message =
        process.env.NODE_ENV === 'production' && !err.status
            ? 'Internal Server Error'
            : err.message;
    return res.status(err.status || 500).json({ error: message });
};

module.exports = errorHandler;
