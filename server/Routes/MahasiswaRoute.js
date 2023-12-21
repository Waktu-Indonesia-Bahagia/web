import express, { response } from "express"
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const router = express.Router()

// * Login Mahasiswa
router.post('/mahasiswalogin', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({loginStatus: false, Error: "Query error"})
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({loginStatus: false, Error: "Password Anda Salah!"})
                if (response) {
                    const email = result[0].email
                    const token = jwt.sign({ role: "member", email: email }, "member_secret_key", { expiresIn: "1d" })
                    res.cookie("token", token)
                    return res.json({ loginStatus: true, id: result[0].id })
                }
            })
        } else {
            return res.json({loginStatus: false, Error: "Email atau Password Anda Salah!"})
        }
    })
})

// * Register Mahasiswa
router.post('/register_mahasiswa', (req, res) => {
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

// * Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

// * ========== USER ==========
// API endpoint untuk mendapatkan 1 data dari database
router.get('/byiduser/:id', (req, res)=> {
    const sql = "SELECT * FROM user WHERE ID = ?"
    const id = req.params.id;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({Message: "Error inside server"}) 
        return res.json(result)
    })
})

// API endpoint untuk mengupdate data di database
router.put('/editprofil/:id', (req, res) => {
    const sql = "UPDATE user SET nama = ?, asal_kampus = ?, email = ?, no_telepon = ?, alamat = ? WHERE id = ?"
    const id = req.params.id
    
    con.query(sql, [req.body.nama, req.body.asal_kampus, req.body.email, req.body.no_telepon, req.body.alamat, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

export {router as mahasiswaRouter}