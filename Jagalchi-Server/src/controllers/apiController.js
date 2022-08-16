export const getUserInfo = (req, res) => {
    let retJSON;
    if(!req.session.loggedIn) {
        retJSON = {
            loggedIn: false,
        }
    } else {
        const user = req.session.loggedIn;
        retJSON = {
            loggedIn: true,
            username: user.username,
            birthDate: user.birthDate,
            points: user.points
        }
    }
    return res.send(retJSON);
}