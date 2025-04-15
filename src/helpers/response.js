
const Success = (message, data = null, extra = null) => {
    var result = {
        status: 1,
        message: message,
    };

    if (data != null || data == []) {
        result['data'] = data;
    }

    if (extra != null) {
        Object.assign(result, extra);
    }

    return result;
};

const Failed = (message) => {
    return {
        status: 0,
        message: message,
    }
}

export default (req, res, next) => {

    res.success = (message, data = null, extra = null) => {
        return res.json(Success(message, data , extra ));
    }

    res.failed = (message) => {
        return res.json(Failed(message));
    };

    next();
};