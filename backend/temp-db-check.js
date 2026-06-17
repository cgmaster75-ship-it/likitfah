const mysql = require('mysql2/promise');

async function main() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'likitfah_db',
            port: 3306
        });
        const [countRows] = await connection.query("SELECT COUNT(*) as total FROM lotto_history");
        const [minMaxRows] = await connection.query("SELECT MIN(draw_date) as min_date, MAX(draw_date) as max_date FROM lotto_history");
        console.log(`Total rows: ${countRows[0].total}`);
        console.log(`Min draw date: ${minMaxRows[0].min_date}`);
        console.log(`Max draw date: ${minMaxRows[0].max_date}`);
        
        // Let's also print the latest 2 draws in detail
        const [latestRows] = await connection.query("SELECT draw_date, draw_year, prize_1, prize_2digits FROM lotto_history ORDER BY draw_date DESC LIMIT 5");
        console.log("Latest draws detail:");
        console.log(latestRows);

        await connection.end();
        process.exit(0);
    } catch (e) {
        console.error("Error querying DB:", e);
        process.exit(1);
    }
}

main();
