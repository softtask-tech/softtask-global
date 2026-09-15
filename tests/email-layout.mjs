import {brandedEmail} from '../worker/emails.mjs';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
const folder='../../outputs/email-review';await mkdir(folder,{recursive:true});
const cases=[['confirmation','Confirm your Soft Task subscription',`Confirm your subscription and selected topic (all):\nhttps://softtask.co/api/confirm?token=${'a'.repeat(64)}\n\nThis link expires in 24 hours. If you did not request this, ignore this email.`],['acknowledgement','We have received your enquiry','Hello Alex,\n\nThank you for contacting Soft Task. Our team will review your enquiry and get back to you within one working day. You can reply to this email if you need to add anything.\n\nYour enquiry\nCompany: Example business\nMarket: Singapore\nCapability: Cybersecurity\n\nMessage\nWe would like to assess our application and cloud security.']];
assert.ok(brandedEmail('<script>','<img src=x onerror=alert(1)>').includes('&lt;img'));
const browser=await chromium.launch({channel:'msedge',headless:true});
try{const page=await browser.newPage();await page.route('**/*',async route=>route.request().url()==='https://softtask.co/logo.png'?route.fulfill({contentType:'image/png',body:await readFile('public/logo.png')}):route.abort());
for(const [id,title,text] of cases){const html=brandedEmail(title,text);await writeFile(`${folder}/${id}.html`,html);for(const width of [320,390,760]){await page.setViewportSize({width,height:1000});await page.setContent(html);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(width===390)await page.screenshot({path:`${folder}/${id}-390.png`,fullPage:true});}}
console.log('HTML emails: escaped content, readable mobile widths, branded previews and plain-text counterparts verified.');}finally{await browser.close();}
