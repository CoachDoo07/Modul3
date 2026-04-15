var express = require('express');
const Model_kategori = require('../model/model_kategoi');
const Model_produk = require('../model/Model_produk');
var router = express.Router();

router.get('/', async function (req, res, next) {
    let rows = await Model_kategori.getAll();
    res.render('kategori/index', {
                    data: rows
        });
});


router.get('/create', function(req, res, next){
    res.render('kategori/create');
})

router.get('/edit/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        let rows = await Model_kategori.getId(id);
        if (!rows || rows.length === 0) {
            req.flash('error', 'Data tidak ditemukan.');
            return res.redirect('/kategori');
        }
        res.render('kategori/edit', {
            id: rows[0].id_kategori,
            nama_kategori: rows[0].nama_kategori
        });
    } catch (err) {
        next(err);
    }
});

router.get('/delete/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        let rows = await Model_kategori.getId(id);
        if (!rows || rows.length === 0) {
            req.flash('error', 'Data tidak ditemukan.');
            return res.redirect('/kategori');
        }

        let count = await Model_produk.countByKategori(id);
        if (count > 0) {
            req.flash('error', 'Kategori tidak dapat dihapus karena masih digunakan oleh produk.');
            return res.redirect('/kategori');
        }

        let result = await Model_kategori.delete(id);
        if (result && result.affectedRows > 0) {
            req.flash('success', 'Data terhapus!');
        } else {
            req.flash('error', 'Gagal menghapus data.');
        }
        res.redirect('/kategori');
    } catch (err) {
        console.error('Delete kategori error:', err);
        req.flash('error', 'Terjadi kesalahan saat menghapus data.');
        next(err);
    }
});



router.post('/simpan',async function(req, res, next){
   const kategori = req.body.nama_kategori;
   Model_kategori.simpan(kategori)
   .then((result) => {
    req.flash('success','Berhasil menyimpan data!');
    res.redirect('/kategori');
   })
   .catch((err) => {
    console.error("Gagal Memasukkan Data, ERROR : ", err);
      return res.status(500).send("Terjadi Kesalahan Saat Memasukkan Data : " + err);
   })
})

router.post('/update/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        let { nama_kategori } = req.body;
        let Data = { nama_kategori };
        await Model_kategori.update(id, Data);
        req.flash('success','Berhasil memperbarui data!');
        res.redirect('/kategori');
    } catch (err) {
        console.error('Update kategori error:', err);
        req.flash('error','Terjadi kesalahan pada fungsi');
        res.redirect('/kategori');
    }
});

module.exports = router;