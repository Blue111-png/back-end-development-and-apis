
function inputCleaner(req, res, next){
    let userName= req.body.username;
    const comment= req.body.comment
    if(userName){
        req.body.username=userName.toLowerCase()
    }
    if(comment){
        req.body.comment=comment.replace(/<\/?[^>]+(>|$)/g, "")
    }
    next()
}

function inputValidator(req, res, next){
    const userName= req.body.username
    if(userName && userName.length >= 3){
        next()
    }else{
        res.redirect("/form?error=Username must be at least 3 characters.")
    }

}

module.exports= {
    inputCleaner,
    inputValidator
}