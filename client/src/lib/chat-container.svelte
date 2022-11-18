 <div bind:this={container} id="chat-container">

    {#each $messages as message }
        <section  class="message" class:isMe={message.from == "me"}>
        
            <div>
                <strong>{message.from}  </strong> <span> -  <small>{message.time}</small></span>
            </div>
            {message.message}
    </section>

    {:else}

        <strong id="e2edesc">
            edge@edge uygulamasını kullanırken mesajlarınız uçtan uca şifrelenmiştir...
        </strong>
    {/each}
 </div>

 <script>
    import { messages } from "./message.store"
    

    // msg container
    let container
    const scrollToBottom = (node) => node.scroll({ top: node.scrollHeight, behavior: 'smooth' });


    $: if($messages.length && container) {
        scrollToBottom(container)
    }
  
 
 </script>
 <style lang="less">
    #chat-container {
        display: flex;
        flex:1;
        flex-direction: column;
        gap: 1.4rem;

        overflow-x: auto;
        // hide scroll bar
        &::-webkit-scrollbar {
            display: none;
            }
        #e2edesc {
                font-size: 1.2rem;
                color: darkslategray;

            }
        .message {
            display: inline-block;
            padding: 1rem;
            width: auto;
            text-align: left;
            &.isMe {
                text-align: right;
            }

        
        }
    }


 

 
 </style>