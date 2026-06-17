const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

const pool = require('../db');

// ข้อมูลพื้นฐานสำหรับศาสตร์จีน
const animals = ['ชวด', 'ฉลู', 'ขาล', 'เถาะ', 'มะโรง', 'มะเส็ง', 'มะเมีย', 'มะแม', 'วอก', 'ระกา', 'จอ', 'กุน'];
const elements = [
    { name: 'ธาตุไฟ (🔥)', color: 'text-red-400' },
    { name: 'ธาตุน้ำ (💧)', color: 'text-blue-400' },
    { name: 'ธาตุไม้ (🌳)', color: 'text-green-400' },
    { name: 'ธาตุทอง (🪙)', color: 'text-amber-400' },
    { name: 'ธาตุดิน (⛰️)', color: 'text-emerald-400' }
];
const types = ['วันเปิดทรัพย์', 'วันธงชัย', 'วันรับโชค', 'วันอธิบดี', 'วันมหาเศรษฐี', 'วันสมปรารถนา'];

router.get('/chinese-calendar', async (req, res) => {
    try {
        // รับค่า ปี และ เดือน จากหน้าเว็บ (ถ้าไม่ส่งมาให้ใช้ปี/เดือน ปัจจุบัน)
        const year = parseInt(req.query.year) || 2026;
        const month = parseInt(req.query.month) || 5; 
        
        const monthNames = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        const thaiDays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

        // กำหนดวันที่เป็นฤกษ์ดีประจำเดือน (6 วัน)
        const daysInMonth = new Date(year, month, 0).getDate();
        const targetDays = [2, 8, 15, 18, 22, 28].filter(d => d <= daysInMonth);

        const resultData = await Promise.all(targetDays.map(async (d, index) => {
            const targetDate = new Date(`${year}-${month}-${d}`);
            const dayOfWeekStr = thaiDays[targetDate.getDay()]; 

            // 🔮 คำนวณนักษัตรและธาตุ ให้สลับสับเปลี่ยนแบบไดนามิกตาม วัน/เดือน/ปี
            const animalIdx = (year + month + d) % 12;
            const elementIdx = (year + month + d) % 5;
            const typeIdx = index % 6;

            // 🌟 ยิง Database: ดึงเลขที่ออกบ่อยสุดใน "วันนั้นๆ" 36 ปี
            const [rows] = await pool.query(`
                SELECT prize_2digits, COUNT(prize_2digits) as frequency
                FROM lotto_history
                WHERE draw_day_of_week = ? 
                  AND prize_2digits IS NOT NULL
                GROUP BY prize_2digits
                ORDER BY frequency DESC
                LIMIT 3
            `, [dayOfWeekStr]);

            let luckyNumbers = ["XX", "XX", "XX"];
            if (rows.length >= 3) {
                luckyNumbers = [
                    rows[0].prize_2digits.padStart(2, '0'),
                    rows[1].prize_2digits.padStart(2, '0'),
                    rows[2].prize_2digits.padStart(2, '0')
                ];
            }

            return {
                day: d,
                month: monthNames[month],
                solarDate: `${dayOfWeekStr}, ${d} ${monthNames[month]} ${year}`,
                lunarDate: `พลังงานประจำวัน (Bazi Energy)`,
                element: elements[elementIdx].name,
                animal: `วัน${animals[animalIdx]}`,
                auspicious: types[typeIdx],
                luckyNums: luckyNumbers,
                color: elements[elementIdx].color
            };
        }));

        res.json(resultData);

    } catch (error) {
        console.error('Chinese Calendar DB Error:', error);
        res.status(500).json({ error: "Database Error" });
    }
});

module.exports = router;