const validate = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            message: "Vui long nhap cong viec",
        });
    } else {
        next();
    }
};

module.exports = {
    validate
};