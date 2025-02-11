import fs from "fs";
import path from "path";

export function parseData(fileName: string, statement: (key: string, value: string, row: Partial<any>) => void): any[] {
    const filePath = path.join(__dirname, `../../../../../Pokemon Essentials v21.1 2023-07-30/PBS/${fileName}`);
    const fileData = fs.readFileSync(filePath, "utf-8");

    const rows: any[] = [];
    const blocks = fileData.split('#-------------------------------');
    let idCounter = 1;

    for (const block of blocks) {
        const lines = block.trim().split('\n');
        if (lines.length < 2) continue;

        const idMatch = lines[0].match(/\[(.*)\]/);
        if (!idMatch) continue;

        const row: Partial<any> = { id: idCounter++ };

        for (const line of lines.slice(1)) {
            const [key, value] = line.split('=').map(s => s.trim());
            if (!key || !value) continue;

            statement(key, value, row);
        }

        rows.push(row);
    }

    return rows;
}