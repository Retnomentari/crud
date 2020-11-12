const {
    serviceAddUser,
    serviceGetUsers,
    serviceGetUsersById,
    serviceUpdateUser,
    serviceDeleteUser
    }= require("./user.service")

const { genSaltSync, hashSync, compareSync} = require("bcrypt");

module.exports = {
    controllerAddUser: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceAddUser(body, (err, results)=>{ //body = data , service menjembatani aplikasi dengan database
            if(err){
                console.log(err); // agar error muncul di terminal
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }else{
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerGetUsers: (req, res)=>{
        serviceGetUsers((err, results)=>{ // err dan results adalah isi dari parameter callBack
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },
    controllerGetUsersById: (req, res)=>{
     const id = req.params.id;
     serviceGetUsersById(id, (err, results)=>{
         if(err){
             console.log(err)
             return
         }
         if(!results){
             return res.json({
                 success:0,
                 message: "record not found"
             })
         }
         else{
             return res.json({
                 success: 1,
                 data: results
             })
         }
      })
     },
    controllerUpdateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        serviceUpdateUser(body, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "update failed"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "update succsesfuly"
                })
            }
        })
    },
    controllerDeleteUser: (req, res) => {
        const body = req.body.id
        serviceDeleteUser(body,(err, results)=>{
            if(err){
                console.log(err)
                return
            }if(!results){
                return res.json({
                    success: 0,
                    message: "Record data not found",
                })
            }else{
                return res.json({
                    success: 1,
                    message: "delete data successful",
                    del: results
                })
        }
        })
    }
}