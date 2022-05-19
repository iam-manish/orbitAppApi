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
    
                var phoneNumber = req.body.phone;
                var password = req.body.password;
                var confirmPassword = req.body.confirmPassword;
                var name = req.body.name;
    
                if(password === confirmPassword){
                    if(results.length==0){
                        const user_info = new OrbitUserInfo();
                        user_info.set("name", name);
                        user_info.set("phoneNumber", phoneNumber);
                        let hash_password = bcrypt.hashSync(password, 15);
                        user_info.set("password", hash_password);
                        const user = await user_info.save();
                        if(user){
                            res.status(200).json({ message: 'User Register Successful' })
                        }else{
                            res.status(400).json({ message: 'User register fail' })
                        }
                        
                    }else{
                        res.status(400).json({ message: 'User Already Registred' })
                    }
                }else{
                    res.status(400).json({ message: 'Password and confirm password didinot matched' })
                }
    
                
    
            }
            handle();
           
        }else{
            res.status(405).json({ message: "Method Not Allowed" })
            
        }
    }else{
        
        res.status(401).json({ message: "Unauthorized Access" })
    }
    
   
  }
  