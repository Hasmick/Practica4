"use strict";
const random = (min, max) =>  { return Math.floor(Math.random() * (max - min) + min);}

function generateUUID(){ 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { 
    let r = Math.random() * 16 | 0; 
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16); 
}) }

const _generateUUID = generateUUID;
export { _generateUUID as generateUUID };