exports.register = (req, res) => {
    console.log(req.body);
    res.send({
        data: req.body
    })
}