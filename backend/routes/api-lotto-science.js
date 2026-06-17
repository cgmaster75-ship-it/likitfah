const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

const pool = require('../db');

// ฟังก์ชันคำนวณหางวดถัดไปอัตโนมัติ
function getNextDrawDate() {
    const today = new Date();
    const d = today.getDate();
    let m = today.getMonth() + 1;
    let y = today.getFullYear();

    let targetDay = 16;
    let targetMonth = m;

    if (d <= 1) { targetDay = 1; } 
    else if (d <= 16) { targetDay = 16; } 
    else {
        targetDay = 1; targetMonth = m + 1;
        if (targetMonth > 12) { targetMonth = 1; y = y + 1; }
    }

    if (targetMonth === 1 && targetDay === 16) targetDay = 17;
    if (targetMonth === 12 && targetDay === 1) targetDay = 1;
    if (targetMonth === 12 && d > 16) targetDay = 30;

    return { targetDay, targetMonth, targetYear: y };
}

router.get('/lotto-science', async (req, res) => {
    const formula = req.query.formula || 'custom';
    const nextDraw = getNextDrawDate(); 
    
    try {
        let num1 = "00", num2 = "99", prob = "0.0";
        const tMonth = nextDraw.targetMonth;
        const tDay = nextDraw.targetDay;
        const tYear = nextDraw.targetYear;

        // 🧠 AI Logic: แยกตรรกะการดึงข้อมูลตามสูตรที่ลูกค้าเลือก
        if (formula === 'day_power') {
            // 🔮 สูตรกำลังวัน: หาสถิติเฉพาะวันที่ตรงกับ "วันในสัปดาห์" ของงวดที่จะถึง
            const [rows] = await pool.query(`
                SELECT prize_2digits, COUNT(prize_2digits) as frequency
                FROM lotto_history
                WHERE DAYOFWEEK(draw_date) = DAYOFWEEK(CONCAT(?, '-', ?, '-', ?))
                  AND prize_2digits IS NOT NULL
                GROUP BY prize_2digits
                ORDER BY frequency DESC LIMIT 2
            `, [tYear, tMonth, tDay]);
            if(rows.length >= 2) { num1 = rows[0].prize_2digits; num2 = rows[1].prize_2digits; }
            prob = (Math.random() * (88 - 80) + 80).toFixed(1);

        } else if (formula === 'mahataksa') {
            // 🔮 สูตรมหาทักษา: ดูเทรนด์ย้อนหลังแค่ 10 ปีล่าสุด
            const [rows] = await pool.query(`
                SELECT prize_2digits, COUNT(prize_2digits) as frequency
                FROM lotto_history
                WHERE draw_month = ? AND DAY(draw_date) = ? 
                  AND draw_year >= (YEAR(CURRENT_DATE()) - 10)
                  AND prize_2digits IS NOT NULL
                GROUP BY prize_2digits
                ORDER BY frequency DESC LIMIT 2
            `, [tMonth, tDay]);
            if(rows.length >= 2) { num1 = rows[0].prize_2digits; num2 = rows[1].prize_2digits; }
            prob = (Math.random() * (92 - 85) + 85).toFixed(1);

        } else if (formula === 'sd_filter' || formula === 'poisson') {
            // 📈 สูตรสถิติขั้นสูง: หลบเลขกระแสหลัก (เอาอันดับ 3 และ 4)
            const [rows] = await pool.query(`
                SELECT prize_2digits, COUNT(prize_2digits) as frequency
                FROM lotto_history
                WHERE draw_month = ? AND DAY(draw_date) = ? AND prize_2digits IS NOT NULL
                GROUP BY prize_2digits
                ORDER BY frequency DESC LIMIT 5
            `, [tMonth, tDay]);
            if(rows.length >= 4) { num1 = rows[2].prize_2digits; num2 = rows[3].prize_2digits; }
            prob = (Math.random() * (95 - 85) + 85).toFixed(1);

        } else {
            // ✍️ สูตรคลาสสิก / Custom: ออกบ่อยสุดอันดับ 1 และ 2 ตลอดกาล
            const [rows] = await pool.query(`
                SELECT prize_2digits, COUNT(prize_2digits) as frequency
                FROM lotto_history
                WHERE draw_month = ? AND DAY(draw_date) = ? AND prize_2digits IS NOT NULL
                GROUP BY prize_2digits
                ORDER BY frequency DESC LIMIT 2
            `, [tMonth, tDay]);
            if(rows.length >= 2) { num1 = rows[0].prize_2digits; num2 = rows[1].prize_2digits; }
            prob = (Math.random() * (98 - 92) + 92).toFixed(1);
        }

        res.json({
            number1: String(num1).padStart(2, '0'),
            number2: String(num2).padStart(2, '0'),
            probability: prob,
            targetDraw: `${tDay}/${tMonth}`
        });

    } catch (error) {
        console.error('Lotto Science DB Error:', error);
        res.status(500).json({ error: "ไม่สามารถประมวลผลจากฐานข้อมูลได้" });
    }
});

module.exports = router;