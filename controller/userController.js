const asyncHandler = require("express-async-handler")
const sql = require("mssql")

const getUsers = asyncHandler(async (req, res) => {
    const query = "SELECT * FROM users"
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

const getUser = asyncHandler(async (req, res) => {
    const uid = req.query.did // Getting the id from the url
    const { didBody } = req.body
    // const { didFromBody } = req.body // Getting the data from the body
    const query = `SELECT * FROM users WHERE UID='${uid}';`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

const createUser = asyncHandler(async (req, res) => {
    const { uid } = req.body // Getting the data from the body
    const query = `INSERT INTO users (UID) VALUES ('${uid}');`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.body // Getting the data from the body
    const query = `DELETE FROM users WHERE UID = '${uid}';`
    try {
        var request = new sql.Request()
        const result = await request.query(query)
        res.status(200).json({ success: true, data: result.recordset })
    } catch (error) {
        res.status(405).json({
            success: false,
            error: error.message,
        })
    }
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
}
