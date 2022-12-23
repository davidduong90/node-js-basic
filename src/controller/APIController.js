import pool from '../configs/connnectDB';

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('select * from users');

    return res.status(200).json({
        message: 'david',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    console.log(req.body);

    if (!firstName || !lastName || !address || !email) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;

    console.log(req.body);

    if (!id || !firstName || !lastName || !address || !email) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute(`UPDATE users
    SET firstName = ?, lastName = ?, email = ?, address = ?
    WHERE id=?`,
        [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let id = req.params.id;

    console.log(req.params.id);

    if (!id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('DELETE FROM users WHERE id=?',
        [id]);
    return res.status(200).json({
        message: 'ok'
    })
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}