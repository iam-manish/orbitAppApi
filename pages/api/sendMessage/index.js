let bcrypt = require("bcryptjs");
const orbitId = "$2a$12$BqvfD/4V5qi9F9V8B8xYGOF3ENsd/WDNp6cgWhrSMHo3cmqQorMB6";

export default function handler(req, res) {
    if(req.body.orbitId != null && bcrypt.compareSync(req.body.orbitId,orbitId)){

    }else{
        res.status(401).json({ message: "Unauthorized Access" })
    }
}