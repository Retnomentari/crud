const db = require("../../config/connection")

module.exports = { // berfungsi agar semua function berada pada modul.exports
    serviceAddUser: (data, callBack) => { 
        db.query(
            `insert into registration2(firstName, lastName, gender, email, password, number)
            values (?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, result) => { // data ditampung di variabel result lalu di return pada callBack
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result)
                }
            }
        )
    },
    serviceGetUsers: callBack => {
        db.query(
            `select*from registration2`,
            [], // data ditampung di array
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                } else {
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetUsersById: (id, callBack) => {
        db.query(
             `select*from registration2 where id = ?`,
             [id],
             (err, results, fields) => {
                 if (err) {
                     return callBack(err)
                 } else {
                     return callBack(null, results[0])
                 }
             }
        )
    },
    serviceUpdateUser: (data, callBack) => {
        db.query(
          `update registration2 set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
          ],
    (err, results) => {
            if (err) {
              return callBack(err);
            } else {
              return callBack(null, results);
            }
          }
        );
    },
    serviceDeleteUser: (data, callBack) => {
        db.query(
          `select * from registration2 where id=?`,
          [data],
          (err, result) => {
            if (err) {
              callBack(err);
            }
            if (!result) {
              callBack(result);
              // console.log(result)
            } else {
              db.query(`delete from registration2 where id=?`, [data]);
              // console.log(results)
              return callBack(null, result[0]);
            }
          }
        );
      }
}