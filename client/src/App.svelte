<div id="main-container">
    <ChatContainer />
    <MessageContainer />
 

</div>

<script>
  import ChatContainer from "./lib/chat-container.svelte";
  import MessageContainer from "./lib/message-container.svelte";
</script>

<style lang="less">
    #main-container {
      display: flex;
      flex: 1;
      justify-content: space-between;
      flex-direction: column;
      padding: 4rem;
      background-color: #94d9dd;
    }
</style>