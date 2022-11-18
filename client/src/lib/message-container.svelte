
  <div id="message-container">

    <textarea on:keydown={handleSendMessage} bind:value={message} name="" id="" cols="30" rows="1"></textarea>
    <button on:click={handleSendMessage}>Gönder</button>
  </div>


  <script>
    import { io, messages } from "./message.store"
    import { nanoid } from "nanoid"
    import crypto from "crypto-js"
    let message = ""
    
    // handleSendMessage
    function handleSendMessage(e) {
          
            if(e.type == "keydown" && e.key !== "Enter")  return
           
            e.preventDefault()
            if(message.trim() == "") return message = ""
            const salt = nanoid(6)
            const time =  new Date().toLocaleString("tr")
            const ciphertext = crypto.AES.encrypt(message, salt).toString();

            
            $messages = [...$messages, { from: "me", message, time}]
            $io.emit("send-message", { message: salt + ciphertext,  time})

            message = ""
            message = message.replace(/\n/g, "")

            if(e.ttpe == "keydown")
              e.target.setSelectionRange(0, 0)

    }

  </script>


  <style lang="less">
    #message-container {
        display: flex;
        height: 4rem;
        border: 1px solid darkslategray;

        textarea {
            flex:1;
            padding: 1rem 0 1rem 1rem;
            height: calc(100% - 2rem);
            background: none;
            outline: none;
            border: none;
            resize: none;
            overflow-x: auto;
            text-overflow: clip;
            &::-webkit-scrollbar {
                display: none;
             }
        }

        button {
            padding: 0 2rem; 
            background: none;
            border: none;

            :hover {
                cursor: pointer;
               
                
            }
        }
    }
  </style>