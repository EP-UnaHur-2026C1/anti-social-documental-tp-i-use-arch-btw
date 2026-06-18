exports.success = (res, data, message, status = 200) =>
    res.status(status).json({ message, data });

exports.created = (res, data, message) =>
    res.status(201).json({ message, data });

exports.noContent = (res) => res.status(204).send();

exports.ok = (res, data) => res.status(200).json(data);
