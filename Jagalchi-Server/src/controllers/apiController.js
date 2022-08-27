export const getUserInfo = (req, res) => {
    let retJSON;
    if(!req.session.loggedIn) {
        retJSON = {
            loggedIn: false,
        }
    } else {
        const user = req.session.user;
        retJSON = {
            loggedIn: true,
            username: user.username,
            userID: user._id,
        }
    }
    return res.send(retJSON);
}