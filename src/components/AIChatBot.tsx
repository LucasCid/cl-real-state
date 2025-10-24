// components/AIChatBot.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Función para llamar a tu API interna
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await response.json();
      return data.message || "Lo siento, no pude procesar tu solicitud.";
      
    } catch (error) {
      console.error('Error al comunicarse con la IA:', error);
      return "Lo siento, estoy teniendo problemas técnicos. Por favor, intenta nuevamente o contacta directamente por WhatsApp.";
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { 
      text: inputMessage, 
      isUser: true, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setIsTyping(true);
    
    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      const botMessage = { 
        text: aiResponse, 
        isUser: false, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        text: "⚠️ Lo siento, hubo un error. Por favor, intenta nuevamente o contáctanos directamente.", 
        isUser: false, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          text: "¡Hola! 👋 Soy tu asistente virtual con inteligencia artificial. Puedo ayudarte a encontrar propiedades, asesorarte sobre precios, financiamiento y mucho más. ¿En qué puedo ayudarte hoy?",
          isUser: false,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  return (
    <>
      {/* Botón flotante del chatbot */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          {/* Efecto de pulso/ping */}
          <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Botón principal */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center"
            aria-label="Abrir chat con IA"
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="transform hover:rotate-12 transition-transform duration-300"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-6-8c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200 transform transition-all duration-300">
          {/* Header del chat */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-semibold">Asistente IA</h3>
                <p className="text-xs text-purple-100">Inteligencia artificial • Especialista inmobiliario</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-200 transition-colors duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-xs px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-purple-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap text-sm">{line}</p>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.isUser ? 'Tú' : 'Asistente IA'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
            
            {/* Indicador de typing */}
            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    <span className="text-xs text-gray-500 ml-2">La IA está pensando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensaje */}
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta cualquier cosa sobre propiedades..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              🤖 Con inteligencia artificial • Entiende cualquier pregunta
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;