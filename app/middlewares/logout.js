const logout = (req, res) => {
    req.session.destroy(function (err){
        if(!err){
            return res.redirect("/")
        }
        else {
            return res.status(500).json({ message: err.message })
        }
    })
}

module.exports = logout