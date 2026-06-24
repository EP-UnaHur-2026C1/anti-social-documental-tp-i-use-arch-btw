exports.paginated = (res, data, total, page, limit) =>
    res.status(200).json({ data, page, limit, total });
