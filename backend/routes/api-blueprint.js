const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// ==========================================
// ⚙️ 1. ตั้งค่า Database (ใช้ host: 'db' สำหรับ Docker)
// ==========================================
const dbConfig = {
    host: 'db',        // 👈 บังคับให้วิ่งไปหาคอนเทนเนอร์ Database
    user: 'root',
    password: 'root',      // ใส่รหัสผ่านของบอส (ถ้ามี)
    database: 'likitfah_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// ==========================================
// ⚙️ 2. ฟังก์ชันดึงเลขที่ออกบ่อยที่สุด (Top 2 สถิติ)
// ==========================================
async function getHotNumbers(month, day) {
    try {
        const [rows] = await pool.query(`
            SELECT prize_2digits, COUNT(prize_2digits) as frequency
            FROM lotto_history
            WHERE draw_month = ? 
              AND DAY(draw_date) = ? 
              AND prize_2digits IS NOT NULL
            GROUP BY prize_2digits
            ORDER BY frequency DESC
            LIMIT 2
        `, [month, day]);

        const num1 = rows[0] ? rows[0].prize_2digits.padStart(2, '0') : "--";
        const num2 = rows[1] ? rows[1].prize_2digits.padStart(2, '0') : "--";
        
        return { num1, num2 };
    } catch (error) {
        console.error('Database Error in getHotNumbers:', error);
        return { num1: "XX", num2: "XX" };
    }
}

// ==========================================
// ⚙️ 3. API Route สำหรับ Blueprint (รองรับการดูย้อนหลัง 5 ปี)
// ==========================================
router.get('/oracle-blueprint', async (req, res) => {
    // รับค่าปีจากหน้าเว็บ (ถ้าไม่ได้ส่งมา ให้ใช้ปี 2026 เป็นค่าเริ่มต้น)
    const targetYear = req.query.year || 2026;

    try {
        const calendarTemplate = [
            { month: 1, name: "JANUARY", th: "มกราคม", draws: [{ d: 17, e: "หวยวันครู" }, { d: 31, e: "งวดพิเศษ" }] },
            { month: 2, name: "FEBRUARY", th: "กุมภาพันธ์", draws: [{ d: 16, e: "วาเลนไทน์" }, { d: 28, e: "สิ้นเดือน" }] },
            { month: 3, name: "MARCH", th: "มีนาคม", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "กลางเดือน" }] },
            { month: 4, name: "APRIL", th: "เมษายน", draws: [{ d: 1, e: "ก่อนสงกรานต์" }, { d: 16, e: "หลังสงกรานต์" }] },
            { month: 5, name: "MAY", th: "พฤษภาคม", draws: [{ d: 2, e: "วันแรงงาน" }, { d: 16, e: "กลางเดือน" }] },
            { month: 6, name: "JUNE", th: "มิถุนายน", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "กลางเดือน" }] },
            { month: 7, name: "JULY", th: "กรกฎาคม", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "กลางเดือน" }] },
            { month: 8, name: "AUGUST", th: "สิงหาคม", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "หวยวันแม่" }] },
            { month: 9, name: "SEPTEMBER", th: "กันยายน", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "กลางเดือน" }] },
            { month: 10, name: "OCTOBER", th: "ตุลาคม", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "ออกพรรษา" }] },
            { month: 11, name: "NOVEMBER", th: "พฤศจิกายน", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "ลอยกระทง" }] },
            { month: 12, name: "DECEMBER", th: "ธันวาคม", draws: [{ d: 1, e: "ต้นเดือน" }, { d: 16, e: "กลางเดือน" }, { d: 30, e: "ส่งท้ายปี" }] }
        ];

        const finalData = await Promise.all(calendarTemplate.map(async (m) => {
            const drawsWithNumbers = await Promise.all(m.draws.map(async (draw) => {
                // 1. ดึงสถิติเลขเด่น 2 อันดับ
                const hotNums = await getHotNumbers(m.month, draw.d);
                
                // 2. ดึงผลออกรางวัลจริง ของปีที่ User เลือก
                let actualResult = null;
                try {
                    const [actualRows] = await pool.query(`
                        SELECT prize_2digits 
                        FROM lotto_history 
                        WHERE draw_year = ? AND draw_month = ? AND DAY(draw_date) = ?
                        LIMIT 1
                    `, [targetYear, m.month, draw.d]);

                    if (actualRows.length > 0 && actualRows[0].prize_2digits) {
                        actualResult = actualRows[0].prize_2digits.padStart(2, '0');
                    }
                } catch (err) {
                    console.error('Error fetching actual result:', err);
                }

                return { 
                    ...draw, 
                    num1: hotNums.num1, 
                    num2: hotNums.num2,
                    actual: actualResult // ส่งเลขออกจริงไปให้หน้าเว็บแสดงผล
                };
            }));

            return {
                name: m.name,
                th: m.th,
                confidence: (Math.random() * (98 - 85) + 85).toFixed(1),
                draws: drawsWithNumbers
            };
        }));

        res.json(finalData);

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;