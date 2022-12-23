import pool from '../configs/connnectDB';
import multer from 'multer';

let getHomepage = async (req, res) => {
    //logic

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.render('index.ejs', { dataUser: rows });

}
let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let user = await pool.execute(`SELECT * from users where id = ?`, [id]);
    console.log('check req param: ', user[0])
    return res.send(JSON.stringify(user[0]));
}

let createNewUser = async (req, res) => {
    console.log('check req: ', req.body);
    let { firstName, lastName, email, address } = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);
    return res.redirect('/');
}
let deleteUser = async (req, res) => {
    let { id } = req.body;

    await pool.execute('DELETE FROM users WHERE id=?',
        [id]);
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [id]);
    console.log(user);
    return res.render('update.ejs', { dataUser: user[0] });
}
let postUpdateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;

    await pool.execute(`UPDATE users
    SET firstName = ?, lastName = ?, email = ?, address = ?
    WHERE id=?`,
        [firstName, lastName, email, address, id]);
    return res.redirect('/');
}
let getUploadFilePage = async (req, res) => {
    return res.render('uploadfile.ejs')
}

let handleUploadFile = async (req, res) => {
    console.log(req.file);

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}
let handleUploadMultipleFiles = async (req, res) => {
    console.log('>>> check files: ', req.files);
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;

    console.log(files);

    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
}