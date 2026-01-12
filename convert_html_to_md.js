import fs from 'fs';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('jquery_cheatsheet_raw.html', 'utf8');
const $ = cheerio.load(html);

const mdLayout = $('.mdLayout').html();

const turndownService = new TurndownService();
const markdown = turndownService.turndown(mdLayout);

fs.writeFileSync('jquery_cheatsheet.md', markdown);
console.log('Converted to Markdown');
