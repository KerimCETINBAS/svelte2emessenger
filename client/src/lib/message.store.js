import { readable, writable } from "svelte/store";
import _io from "socket.io-client"
import CryptoJS, { enc } from "crypto-js";
/**
 * 
 *{
 *     from : "me" | string
 *     message : encrypted
 *     time: Date.now()
 * }
 */

export const io = readable(_io("http://localhost:3000"))

io.subscribe(client => client.on("message", message => {
    console.log(message)
    
    const salt = String( message.message).substring(0, 6)
    const encrypted = String(message.message).substring(6,)
    const decrypted = CryptoJS.AES.decrypt(encrypted, salt).toString(CryptoJS.enc.Utf8);
    message.message = decrypted
    messages.update(msgs => [...msgs, message])
    message = ""
}))

export const messages = writable([])