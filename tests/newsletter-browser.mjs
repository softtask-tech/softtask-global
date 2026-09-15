import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import worker from '../worker/index.mjs';
let changes=0;const origins=[];
const env={SITE_ORIGIN:'https://softtask.co',MAIL_FROM:'test@example.com',MAIL_API_KEY:'test',DB:{prepare(){return {bind(){return {first:async()=>({email:'reader@example.com',pending_topic:'all',confirm_expires:Date.now()+60000}),run:async()=>{changes++;return {meta:{changes:1}}}}}}}}};
const originalFetch=globalThis.fetch;
globalThis.fetch=async()=>Response.json({id:'mock-delivery'});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage();
 await page.route('**/*',async route=>{
  const r=route.request();if(!r.url().includes('/api/'))return route.fulfill({status:404,body:''});
  const headers=await r.allHeaders();if(r.method()==='POST')origins.push(headers.origin);
  const response=await worker.fetch(new Request(r.url(),{method:r.method(),headers,...(r.postData()?{body:r.postData()}: {})}),env);
  await route.fulfill({status:response.status,headers:Object.fromEntries(response.headers),body:await response.text()});
 });
 await page.goto(`https://softtask.co/api/confirm?token=${'a'.repeat(64)}`);
 assert.equal(changes,0,'Opening an email link does not confirm it');
 await page.getByRole('button',{name:'Confirm subscription',exact:true}).click();
 await page.getByRole('heading',{name:'Your subscription is confirmed.'}).waitFor();
 assert.equal(changes,1);
 await page.getByRole('button',{name:'Unsubscribe',exact:true}).click();
 await page.getByRole('heading',{name:'You are unsubscribed.'}).waitFor();
 assert.equal(changes,2);assert.deepEqual(origins,['https://softtask.co','https://softtask.co']);
 for(const origin of ['null','https://evil.example']){
  const r=await worker.fetch(new Request('https://softtask.co/api/confirm',{method:'POST',headers:{Origin:origin},body:`token=${'a'.repeat(64)}`}),env);assert.equal(r.status,403);
 }
 console.log('Browser confirmation and unsubscribe passed; GET is read-only; same-origin POST succeeds; null and foreign origins remain rejected. No real emails sent.');
}finally{await browser.close();globalThis.fetch=originalFetch;}
