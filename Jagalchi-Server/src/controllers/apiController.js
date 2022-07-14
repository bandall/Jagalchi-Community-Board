export const getUserInfo = (req, res) => {
    console.log(req.session);
    let body;
    if(!req.session.loggedIn) {
        body = {
            loggedIn: false,
        }
    } else {
        const user = req.session.loggedIn;
        body = {
            loggedIn: true,
            username: user.username,
            birthDate: user.birthDate,
            points: user.points
        }
    }
    return res.send(body);
}
