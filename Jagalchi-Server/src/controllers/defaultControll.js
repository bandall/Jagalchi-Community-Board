export const home = (req, res) => {
    res.sendFile("/home/node/app/Jagalchi-Server/assets/index.html");
}

export const attendance = (req, res) => {
    res.send("attendance");
}