const User = require ('./user.model')

const DbQuerys = {
    getAllUsers: async (sequelize) => {
        try {
            const users = await sequelize.query('SELECT * FROM delilah.user;',
                { type: sequelize.QueryTypes.SELECT})
                return users
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    },

    insertNewUser: async (sequelize, { fullname, mail, phone, address, username, pass, rol }) => {
        try {
            const user = new User (fullname, mail, phone, address, username, pass, rol)
            const insertQuery = 'INSERT INTO delilah.user (user_fullname, user_mail, user_phone, user_address, user_username, user_pass, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?);'
            await sequelize.query(insertQuery,
                { replacements: [user.fullname, user.mail, user.phone, user.address, user.username, user.pass, user.rol]
                })
                return user
        } catch (error) {
            console.log('ERROR: ' + error)
        }

    },

    updateUserByID: async (sequelize, id, userData) => {
        try {
            for (const value in userData) {
                
                if (value === 'rol') { console.log(value)
                    await sequelize.query(`UPDATE delilah.user SET rol_id = ? WHERE user_id = ?;`,
                    {replacements: [userData[value], id]
                    })
                } else {console.log(value)
                    await sequelize.query(`UPDATE delilah.user SET user_${value} = ? WHERE user_id = ?;`,
                    {replacements: [userData[value], id]
                    })
                }
                
            }
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    },

    deleteUserById: async (sequelize, id) => {
        try {
            await sequelize.query(`DELETE FROM delilah.user WHERE user_id = ?`,
            {replacements: [id]})
        } catch (error) {
            console.log('ERROR: ' + error)
        }
    }

}

module.exports = DbQuerys