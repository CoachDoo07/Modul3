const connection = require('../config/database');

class Model_kategori {

    static async getAll() {
    return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori ORDER BY id_kategori DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async simpan(Data) {
    return new Promise((resolve, reject) => {
            connection.query("INSERT INTO kategori (nama_kategori) VALUES (?)", [Data], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori WHERE id_kategori = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE kategori SET ? WHERE id_kategori = ?', [Data, id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM kategori WHERE id_kategori = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_kategori;