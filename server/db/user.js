const pool = require('./pool');
const { ErrorHandler } = require('../utils/error');

/**
 * Insert user on database
 * @param {Object} user
 * @example 
 * insertUser({
 *  username: 'name',
 *  email: 'email address',
 *  password: 'hashed',
 *  id: 99 // id is optional
 * });
 * @returns {number} id - created id
 */
const insertUser = (userObj) => {
    const { username, email, password, id = null } = userObj;

    return new Promise((resolve, reject) => {
        pool.query(
            `
                INSERT INTO users (username, email, password ${id ? ", id" : ""}) 
                VALUES (?, ?, ? ${id ? ", " + id : ""})
            `,
            [
                username,
                email,
                password,
            ],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return
                }

                const userId = result.insertId;

                resolve(userId);
            }
        );
    });
};

/**
 * Returns user object
 * @param {number} userId 
 * @returns {object} - {id, username, email, password}.
 */
const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT id, username, email, password FROM users
                WHERE id = ?
            `,
            [userId],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const user = result[0];

                resolve(user);
            }
        );
    });
};

/**
 * Returns user object
 * @param {email} email
 * @returns {object} - {id, username, email, password}.
 */
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                SELECT id, username, email, password FROM users
                WHERE email = ?
            `,
            [email],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                }

                const user = result[0];

                resolve(user);
            }
        );
    });
};

/**
 * Update user. Error thrown if no affected row.
 * @param {object} userObj 
 * @returns {undefined}
 */
const updateUser = (userObj) => {
    const { username, email, password, id } = userObj;

    return new Promise((resolve, reject) => {
        pool.query(
            `
                UPDATE users 
                SET 
                    username=?,
                    email=?,
                    password=? 
                WHERE id = ?
            `,
            [
                username,
                email,
                password,
                id,
            ],
            (err, result, fields) => {
                if (err) {
                    return reject(err);
                }

                const affectedRows = result.affectedRows;
                if (affectedRows === 0) {
                    return reject(new Error("No user updated!! Check the user id."));
                }

                resolve();
            }
        );
    });
}


/**
 * Delete a user. Error thrown if no user deleted.
 * @param {number} id
 * @returns {undefined}
 */
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `
                DELETE FROM users WHERE id = ?
            `,
            [id],
            (err, result, fields) => {
                if (err) {
                    return reject(err);
                }

                const affectedRows = result.affectedRows;
                if (affectedRows === 0) {
                    return reject(new Error("No user deleted!!"));
                }

                resolve();
            }
        );
    });
};



module.exports = {
    insertUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
};