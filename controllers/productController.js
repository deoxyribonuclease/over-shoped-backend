

const test = async (req, res) => {
    console.log(req.body); // Log the request body for debugging
    const { test } = req.body;
    res.status(200).json({ message: `test content: ${test}` });
};

module.exports = { test };