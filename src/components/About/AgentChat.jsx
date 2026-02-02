import React, { useState } from "react";
import { useChat } from '@ai-sdk/react';
import { Send, Bot, User as UserIcon, Sparkles } from "lucide-react";

const AgentChatSection = () => {
  const [text, setText] = useState("");
  
  // Local state for fake messages (fallback if library fails)
  const [fakeMessages, setFakeMessages] = useState([]);

  // Attempt to initialize the chat hook
  const chatHook = useChat({
    api: '/api/chat',
    onError: (err) => console.log("Library Error (Ignored in Safe Mode)"),
  });

  // Check if the library is actually working
  const isLibraryWorking = chatHook && typeof chatHook.append === 'function';

  // Use real messages if library works, otherwise use fake ones
  const displayMessages = isLibraryWorking ? chatHook.messages : fakeMessages;
  const isLoading = isLibraryWorking ? chatHook.isLoading : false;

  // Smart submit handler
  const handleCustomSubmit = async (e) => {
    e.preventDefault(); 
    if (!text.trim()) return; 

    const userMessage = { id: Date.now(), role: 'user', content: text };
    setText(""); 

    if (isLibraryWorking) {
      // --- Real Mode ---
      try {
        await chatHook.append({ role: 'user', content: text });
      } catch (error) { console.error(error); }
    } else {
      // --- Simulation Mode ---
      console.warn("Library broken, running simulation...");
      setFakeMessages(prev => [...prev, userMessage]);
      setTimeout(() => {
        setFakeMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'assistant',
          content: "⚠️ Chat library is currently offline locally. This is a simulated response to let you continue designing."
        }]);
      }, 600);
    }
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-accent font-bold tracking-wider uppercase text-xs">AI Assistant</span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
          Chat with Germany Assist
        </h2>
        
        {!isLibraryWorking && (
            <p className="text-xs text-amber-500 mt-2 font-mono bg-amber-500/10 inline-block px-2 py-1 rounded">
                Running in Design Mode (Library Offline)
            </p>
        )}
      </div>

      <div className="rounded-2xl border border-light-700 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col h-[600px]">
        
        {/* Header */}
        <div className="p-4 border-b border-light-700 dark:border-white/10 bg-light-800/50 dark:bg-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
            <Sparkles size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">AI Agent</h3>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isLibraryWorking ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                <p className="text-xs text-slate-500">
                    {isLibraryWorking ? "Online & Ready" : "Design Mode Active"}
                </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/20">
          {displayMessages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                <Bot size={48} className="mb-4" />
                <p>Ask me about visa processes, relocation, or our team.</p>
            </div>
          )}
          
          {displayMessages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={16} className="text-slate-600 dark:text-slate-300" />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-accent text-white rounded-tr-none' 
                  : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-white/10'
              }`}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                  <UserIcon size={16} className="text-slate-500 dark:text-slate-300" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 items-center ml-12 text-xs text-slate-400">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce delay-100">•</span>
                <span className="animate-bounce delay-200">•</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-zinc-900/50 border-t border-light-700 dark:border-white/10">
          <form onSubmit={handleCustomSubmit} className="flex gap-2 relative">
            <input
              className="flex-1 bg-slate-100 dark:bg-black/50 border border-transparent dark:border-white/10 focus:border-accent rounded-xl px-5 py-4 text-sm focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-500 transition-all"
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
            />
            <button 
              type="submit"
              disabled={!text.trim()} 
              className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent/90 text-white px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default AgentChatSection;