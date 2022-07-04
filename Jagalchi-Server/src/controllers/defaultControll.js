export const home = (req, res) => {
    res.sendFile(process.env.ASSET_PATH + "/index.html");
}

export const attendance = (req, res) => {
    res.send("attendance");
}