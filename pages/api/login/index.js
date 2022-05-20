import Moralis from "moralis/node";
let bcrypt = require("bcryptjs");
class OrbitUserInfo extends Moralis.Object {
    constructor() {
      super("OrbitUserInfo");
    }
  }


const orbitId = "$2a$12$BqvfD/4V5qi9F9V8B8xYGOF3ENsd/WDNp6cgWhrSMHo3cmqQorMB6";
export default function handler(req, res) {
    if(req.body.orbitId != null && bcrypt.compareSync(req.body.orbitId,orbitId)){
        if(req.method == "POST"){
            const handle = async () => {
                await Moralis.start({
                    serverUrl: "https://waqznab5ifqs.usemoralis.com:2053/server",
                    appId: "d5nXdIv1a6Ac5hztm9jF5u9utZCmovPBwcA1Ayua",
                    masterKey: "924jSeOxHpqVBB9VocfXpEceEnWTH06HJmBuJhGQ",
                });

                const OrbitUserInfo = Moralis.Object.extend("OrbitUserInfo");
                const query = new Moralis.Query(OrbitUserInfo);
                query.equalTo("phoneNumber", req.body.phone);
                const results = await query.find();
                if(results.length>0){
                    if(bcrypt.compareSync(req.body.password,results[0].get("password"))){
                        res.status(200).json(
                            {
                                message:{
                                    name:results[0].get("name"),
                                    password:req.body.password,
                                    phoneNumber:results[0].get("phoneNumber")
                                }
                            }
                        )
                    }else{
                        res.status(400).json({ message: 'Incorrect phone number or password' })
                    }
                }else{
                    res.status(400).json({ message: 'Incorrect phone number or password' })
                }
            }
            handle();
        }else{
            res.status(405).json({ message: "Method Not Allowed" })
        }
    }else{
        res.status(401).json({ message:"Unauthorized Access"  })
    }
}