export const loginOnlyMiddleWare = (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    }
    else {
        return res.redirect("/");
    }
}

export const publicOnlyMiddleWare = (req, res, next) => {
    if(!req.session.loggedIn) {
        next();
    } else {
        res.redirect("/");
    }
}