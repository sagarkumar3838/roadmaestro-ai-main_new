import * as fs from 'fs';

function parseCSV(csvContent: string): string[][] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  });
}

function testCSV() {
  try {
    console.log('Testing CSV parsing...');

    // Test profiles CSV
    const profilesPath = 'c:/Users/death/Downloads/profiles_rows.csv';
    console.log(`Reading profiles from: ${profilesPath}`);

    if (!fs.existsSync(profilesPath)) {
      console.error('❌ Profiles CSV file not found');
      return;
    }

    const profilesContent = fs.readFileSync(profilesPath, 'utf-8');
    const profilesRows = parseCSV(profilesContent);

    console.log(`📊 Profiles CSV has ${profilesRows.length} rows`);
    console.log('Headers:', profilesRows[0]);
    console.log('First data row:', profilesRows[1]);

    // Test used questions CSV
    const questionsPath = 'c:/Users/death/Downloads/used_questions_rows.csv';
    console.log(`Reading questions from: ${questionsPath}`);

    if (!fs.existsSync(questionsPath)) {
      console.error('❌ Used questions CSV file not found');
      return;
    }

    const questionsContent = fs.readFileSync(questionsPath, 'utf-8');
    const questionsRows = parseCSV(questionsContent);

    console.log(`❓ Used questions CSV has ${questionsRows.length} rows`);
    console.log('Headers:', questionsRows[0]);
    console.log('First data row:', questionsRows[1]);

    console.log('✅ CSV parsing test completed successfully');

  } catch (error) {
    console.error('❌ CSV parsing test failed:', error);
  }
}

testCSV();
