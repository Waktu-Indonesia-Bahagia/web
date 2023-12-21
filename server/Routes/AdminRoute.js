import express from "express"
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import bcrypt from 'bcrypt'

const router = express.Router()

// * Register Admin
router.post('/register_admin', (req, res) => {
    const { nama, email, password, role } = req.body
    const sql = 'INSERT INTO user (nama, email, password, role) VALUES (?, ?, ?, ?)'
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.json({Status: false, Error: "Query error"}) 

        con.query(sql, [nama, email, hash, role], (err, result) => {
            if (err) return res.json(err)
            return res.json(result)
        })
    })
})

// * Login Admin
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({loginStatus: false, Error: "Query error"})
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({loginStatus: false, Error: "Password Anda Salah!"})
                if (response) {
                    const email = result[0].email
                    const token = jwt.sign({ role: "admin", email: email }, "admin_secret_key", { expiresIn: "1d" })
                    res.cookie("token", token)
                    return res.json({ loginStatus: true, id: result[0].id })
                }
            })
        } else {
            return res.json({loginStatus: false, Error: "Email atau Password Anda Salah!"})
        }
    })
})

// * =============== IMAGE UPLOAD =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// * =============== USER =================
// API endpoint untuk mengupdate data di database
router.put('/editprofiladmin/:id', (req, res) => {
    const sql = "UPDATE user SET nama = ?, email = ?, no_telepon = ?, alamat = ? WHERE id = ?"
    const id = req.params.id
    
    con.query(sql, [req.body.nama, req.body.email, req.body.no_telepon, req.body.alamat, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// * =============== DASHBOARD =================
router.get('/totalmahasiswa', (req, res)=> {
    const sql = "SELECT COUNT(*) as total FROM mahasiswa";
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

router.get('/aktif', (req, res)=> {
    const sql = "SELECT COUNT(*) as total FROM mahasiswa WHERE status = 'aktif'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

router.get('/nonaktif', (req, res)=> {
    const sql = "SELECT COUNT(*) as total FROM mahasiswa WHERE status = 'tidak-aktif'";
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
})
})

router.get('/totalpermohohanan', (req, res)=> {
    const sql = "SELECT COUNT(*) as total FROM permohonan";
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

// * =============== MAHASISWA =================
// API endpoint untuk mendapatkan data dari database
router.get('/Mahasiswa', (req, res)=> {
    const sql = "SELECT * FROM mahasiswa";
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

// API endpoint untuk mendapatkan 1 data dari database
router.get('/byidmahasiswa/:id', (req, res)=> {
    const sql = "SELECT * FROM mahasiswa WHERE ID = ?";
    const id = req.params.id;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

// API endpoint untuk menambahkan data ke database
router.post('/tambahmahasiswa', (req, res) => {
    const { nama, asal_kampus, no_telepon, email, program_pilihan, keterangan, tgl_mulai, tgl_akhir, status } = req.body;
    const sql = 'INSERT INTO mahasiswa (nama, asal_kampus, no_telepon, email, program_pilihan, keterangan, tgl_mulai, tgl_akhir, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    con.query(sql, [nama, asal_kampus, no_telepon, email, program_pilihan, keterangan, tgl_mulai, tgl_akhir, status], (err, result) => {
        if (err) return res.json(err);
        return res.json(result); 
    });
});

// API endpoint untuk mengupdate data di database
router.put('/editmahasiswa/:id', (req, res) => {
    const sql = "UPDATE mahasiswa SET nama = ?, asal_kampus = ?, no_telepon = ?, email = ?, program_pilihan = ?, keterangan = ?, tgl_mulai = ?, tgl_akhir = ?, status = ? WHERE id = ?";
    const id = req.params.id;
    
    con.query(sql, [req.body.nama, req.body.asal_kampus, req.body.no_telepon, req.body.email, req.body.program_pilihan, req.body.keterangan, req.body.tgl_mulai, req.body.tgl_akhir, req.body.status, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result); 
    })
})

// API endpoint untuk menghapus data di database
router.delete('/hapusmahasiswa/:id', (req, res) => {
    const sql = "DELETE FROM mahasiswa WHERE id = ?";
    const id = req.params.id;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result); 
    })
})    

// * =============== PEMBIMBING =================
// API endpoint untuk mendapatkan data dari database
router.get('/Pembimbing', (req, res)=> {
    const sql = "SELECT * FROM pembimbing";

    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

// API endpoint untuk mendapatkan 1 data dari database
router.get('/read/:id', (req, res)=> {
    const sql = "SELECT * FROM pembimbing WHERE ID = ?";
    const id = req.params.id;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result);
    })
})

// API endpoint untuk menambahkan data ke database
router.post('/tambahpembimbing', (req, res) => {
    const { nama, nip, telepon, email } = req.body
    const sql = 'INSERT INTO pembimbing (nama, nip, telepon, email) VALUES (?, ?, ?, ?)'
    
    con.query(sql, [nama, nip, telepon, email], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// API endpoint untuk mengupdate data di database
router.put('/editpembimbing/:id', (req, res) => {
    const sql = "UPDATE pembimbing SET nama = ?, nip = ?, telepon = ?, email = ? WHERE id = ?";
    const id = req.params.id;
    
    con.query(sql, [req.body.nama, req.body.nip, req.body.telepon, req.body.email, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result); 
    })
})

// API endpoint untuk menghapus data di database
router.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM pembimbing WHERE id = ?"
    const id = req.params.id

    con.query(sql, [id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result) 
    })
})

// * =============== PERMOHONAN =================
// API endpoint untuk mendapatkan data dari database
router.get('/Permohonan', (req, res)=> {
    const sql = "SELECT * FROM permohonan"
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result)
    })
})

// API endpoint untuk mendapatkan 1 data dari database
router.get('/byidpermohonan/:id', (req, res)=> {
    const sql = "SELECT * FROM permohonan WHERE ID = ?"
    const id = req.params.id

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result)
    })
})

// API endpoint untuk menambahkan data ke database
router.post('/tambahpermohonan', upload.single('surat_permohonan'), (req, res) => {
    const { nama, asal_kampus, no_telepon, email, program_pilihan } = req.body
    const surat_permohonan = req.file.filename
    const sql = 'INSERT INTO permohonan (nama, asal_kampus, no_telepon, email, program_pilihan, surat_permohonan) VALUES (?, ?, ?, ?, ?, ?)'
    
    con.query(sql, [nama, asal_kampus, no_telepon, email, program_pilihan, surat_permohonan], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

router.post('/tambahsertifikat', upload.single('file_sertifikat'), (req, res) => {
    const { nama, keahlian } = req.body
    const file_sertifikat = req.file.filename
    const sql = 'INSERT INTO sertifikat (nama, keahlian, file_sertifikat) VALUES (?, ?, ?)'
    
    con.query(sql, [nama, keahlian, file_sertifikat], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// API endpoint untuk mengupdate data di database
router.put('/editpermohonan/:id', (req, res) => {
    const sql = "UPDATE permohonan SET status = ? WHERE id = ?";
    const id = req.params.id;
    
    con.query(sql, [req.body.status, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result); 
    })
})

// API endpoint untuk menghapus data di database
router.delete('/hapuspermohonan/:id', (req, res) => {
    const sql = "DELETE FROM permohonan WHERE id = ?"
    const id = req.params.id

    con.query(sql, [id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

// API endpoint untuk menambahkan data ke database
router.post('/tambahmahasiswapermohonan', (req, res) => {
    const { nama, asal_kampus, no_telepon, email, program_pilihan, keterangan, tgl_mulai, tgl_akhir } = req.body
    const sql = 'INSERT INTO mahasiswa (nama, asal_kampus, no_telepon, email, program_pilihan, keterangan, tgl_mulai, tgl_akhir) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    
    con.query(sql, [nama, asal_kampus, no_telepon, email, program_pilihan, keterangan, tgl_mulai, tgl_akhir], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// * =============== SERTIFIKAT =================
// API endpoint untuk mendapatkan data dari database
router.get('/Sertifikat', (req, res)=> {
    const sql = "SELECT * FROM sertifikat"
    con.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result)
    })
})

// API endpoint untuk mendapatkan 1 data dari database
router.get('/byidsertifikat/:id', (req, res)=> {
    const sql = "SELECT * FROM sertifikat WHERE ID = ?"
    const id = req.params.id;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result)
    })
})

// API endpoint untuk menambahkan data ke database
router.post('/tambahsertifikat', upload.single('file_sertifikat'), (req, res) => {
    const { nama, keahlian } = req.body
    const file_sertifikat = req.file.filename
    const sql = 'INSERT INTO sertifikat (nama, keahlian, file_sertifikat) VALUES (?, ?, ?)'
    
    con.query(sql, [nama, keahlian, file_sertifikat], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// API endpoint untuk mengupdate data di database
router.put('/editsertifikat/:id', (req, res) => {
    const sql = "UPDATE sertifikat SET nama = ?, keahlian = ? WHERE id = ?"
    const id = req.params.id
    
    con.query(sql, [req.body.nama, req.body.keahlian, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

// API endpoint untuk menghapus data di database
router.delete('/hapussertifikat/:id', (req, res) => {
    const sql = "DELETE FROM sertifikat WHERE id = ?"
    const id = req.params.id

    con.query(sql, [id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result) 
    })
})

export {router as adminRouter}