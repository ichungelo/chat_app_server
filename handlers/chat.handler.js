const writeChat = (req,res) => {
    const uuid = req.params.username
    const body = {
        success: req.body.success,
        message: req.body.message,
    }
    res.status(200), res.json({
        success: body.success,
        id: uuid,
        message: body.message
    })
}

// const getChat = (req, res)=> {

// }
module.exports = { writeChat }