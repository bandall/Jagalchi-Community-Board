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
        return res.redirect("/");
    }
}

export const authProcessOnlyMiddleWare = (req, res, next) => {
    console.log("auth" + " " + String(req.session));
    if(req.session.loggedIn) {
        return res.redirect("/");
    } 
    if(req.session.user) {
        return next();
    }
    else {
        return res.redirect("/");
    }
}