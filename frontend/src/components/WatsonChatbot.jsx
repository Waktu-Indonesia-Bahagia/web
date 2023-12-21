import React, { useEffect } from 'react'

const WatsonChatbot = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "ca559c37-423b-413a-a692-2ea495c9cb52",
      region: "us-south",
      serviceInstanceID: "9be5a095-c16c-4d73-94d5-e9e98a7090c6",
      onLoad: async (instance) => { await instance.render() }
    };

    const script = document.createElement('script')
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js"
    document.head.appendChild(script)


    return () => {
      document.head.removeChild(script)
    };
  }, []);

  return (
    <div id="WatsonChatContainer">
      {}
    </div>
  );
};

export default WatsonChatbot
