// components/ChatBot.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Respuestas expandidas del bot
  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase().trim();
    
    // Saludos y presentaciones
    if (message.includes('hola') || message.includes('buenas') || message.includes('buenos días') || message.includes('buenas tardes') || message.includes('buenas noches')) {
      return "¡Hola! 😊 Soy tu asistente virtual de bienes raíces. ¿En qué puedo ayudarte hoy?\n\nPuedo ayudarte a:\n• Buscar propiedades\n• Información sobre financiamiento\n• Agendar visitas\n• Resolver dudas generales\n• Asesoría en compra/venta";
    }

    if (message.includes('IA') || message.includes('ia') || message.includes('inteligencia') || message.includes('artificial') || message.includes('buenas noches')) {
      return "No soy IA 😊 Soy tu asistente virtual de bienes raíces. ¿En qué puedo ayudarte hoy?\n\nPuedo ayudarte a:\n• Buscar propiedades\n• Información sobre financiamiento\n• Agendar visitas\n• Resolver dudas generales\n• Asesoría en compra/venta";
    }
    
    // Estado emocional del usuario
    if (message.includes('cómo estás') || message.includes('como estas') || message.includes('qué tal')) {
      return "¡Estoy excelente! 🤗 Listo para ayudarte a encontrar la propiedad de tus sueños. ¿En qué te puedo asistir hoy?";
    }
    
    if (message.includes('triste') || message.includes('preocupado') || message.includes('estresado') || message.includes('ansioso')) {
      return "Lamento escuchar eso 😔. Encontrar la propiedad ideal puede ser un proceso emocionante y quiero ayudarte a que sea más fácil. ¿Quieres contarme qué tipo de propiedad buscas? A veces enfocarse en el futuro hogar ayuda a sentirse mejor.";
    }
    
    if (message.includes('feliz') || message.includes('emocionado') || message.includes('contento')) {
      return "¡Me alegra mucho! 🎉 Es un momento emocionante buscar propiedad. ¿Estás pensando en comprar, vender o tal vez invertir?";
    }
    
    // Consultas sobre propiedades
    if (message.includes('propiedad') || message.includes('casa') || message.includes('departamento') || message.includes('apartamento') || message.includes('inmueble') || message.includes('vivienda') || message.includes('compra')) {
      return "¡Excelente! 🏡 Tenemos diversas propiedades disponibles. ¿Qué tipo de propiedad buscas?\n\n• Casa\n• Departamento\n• Oficina\n• Local comercial\n• Terreno\n\n¿Y en qué región de Chile te interesa?";
    }
    
    if (message.includes('precio') || message.includes('cost') || message.includes('presupuesto') || message.includes('valor') || message.includes('cuánto cuesta') || message.includes('cuanto cuesta')) {
      return "Los precios varían según ubicación y características. ¿Tienes un rango de presupuesto específico en mente?\n\nPor ejemplo:\n• Hasta UF 2.000\n• UF 2.000 - 4.000\n• UF 4.000 - 6.000\n• Más de UF 6.000";
    }
    
    // Ubicaciones específicas
    if (message.includes('santiago') || message.includes('valparaíso') || message.includes('concepción') || message.includes('la serena') || message.includes('antofagasta') || message.includes('región')) {
      return "Buena elección de ubicación! 🗺️ ¿Buscas casa, departamento u oficina en esa zona? También puedo ayudarte con información sobre:\n• Barrios recomendados\n• Precios promedio\n• Servicios cercanos";
    }
    
    // Financiamiento
    if (message.includes('crédito') || message.includes('financiamiento') || message.includes('hipoteca') || message.includes('pie') || message.includes('ahorro')) {
      return "💰 Te puedo orientar sobre opciones de financiamiento. ¿Quieres que active nuestra calculadora hipotecaria o prefieres hablar directamente con un asesor?\n\nTambién puedo explicarte sobre:\n• Crédito hipotecario\n• Ahorro previo\n• Subsidios disponibles\n• Tasas de interés";
    }
    
    // Agendar visitas
    if (message.includes('visita') || message.includes('ver') || message.includes('agendar') || message.includes('cita') || message.includes('reunión')) {
      return "Perfecto! 📅 Para agendar una visita, necesito algunos datos. ¿Podrías proporcionarme tu email o prefieres que te contactemos por WhatsApp?\n\nTambién puedes:\n• Ver propiedades disponibles online\n• Solicitar tour virtual\n• Recibir fotos adicionales";
    }

    if (message.includes('quien eres') || message.includes('que eres') || message.includes('eres humano') || message.includes('humano') || message.includes('persona')) {
      return "No soy humano, ni persona, ni IA 😊 Soy tu asistente virtual de bienes raíces. ¿En qué puedo ayudarte hoy?\n\nPuedo ayudarte a:\n• Buscar propiedades\n• Información sobre financiamiento\n• Agendar visitas\n• Resolver dudas generales\n• Asesoría en compra/venta";
    }
    
    // Proceso de compra
    if (message.includes('comprar') || message.includes('adquirir') || message.includes('invertir')) {
      return "¡Excelente decisión! 📈 Comprar propiedad es una gran inversión. ¿Es tu primera vivienda o estás buscando invertir?\n\nTe puedo guiar en:\n• Proceso de compra\n• Documentación necesaria\n• Evaluación de propiedad\n• Negociación";
    }
    
    // Venta de propiedades
    if (message.includes('vender') || message.includes('vendo') || message.includes('venta')) {
      return "¡Perfecto! 🏠 Vender tu propiedad puede ser muy beneficioso. ¿Ya tienes una propiedad en mente o necesitas asesoría para valorarla?\n\nPodemos ayudarte con:\n• Valoración gratuita\n• Estrategias de venta\n• Fotografía profesional\n• Publicación en portales";
    }
    
    // Tiempos y disponibilidad
    if (message.includes('cuándo') || message.includes('cuando') || message.includes('disponibilidad') || message.includes('tiempo') || message.includes('urgente')) {
      return "⏰ Entiendo la importancia del tiempo. Las propiedades suelen estar disponibles en:\n• Inmediato (ya desocupadas)\n• 30-60 días\n• Proyectos en construcción\n\n¿Qué tan pronto necesitas la propiedad?";
    }
    
    // Características de propiedades
    if (message.includes('habitación') || message.includes('dormitorio') || message.includes('baño') || message.includes('estacionamiento') || message.includes('metro') || message.includes('tamaño')) {
      return "🏠 Las características son importantes. ¿Qué especificaciones buscas?\n\n• Dormitorios: 1, 2, 3, 4+\n• Baños: 1, 2, 3+\n• Estacionamientos\n• Metros cuadrados\n• Amenidades (piscina, gym, etc.)";
    }
    
    // Información general sobre bienes raíces
    if (message.includes('consejo') || message.includes('tip') || message.includes('recomendación') || message.includes('qué debo saber')) {
      return "💡 Te doy algunos consejos importantes:\n\n• Investiga el barrio a diferentes horas\n• Revisa los gastos comunes\n• Verifica la documentación de la propiedad\n• Considera gastos de escrituración\n• Evalúa opciones de financiamiento\n• Negocia siempre el precio\n\n¿Te interesa algún consejo en específico?";
    }
    
    // Agradecimientos
    if (message.includes('gracias') || message.includes('thank') || message.includes('agradecido') || message.includes('te agradezco')) {
      return "¡De nada! 😊 Es un placer ayudarte. ¿Hay algo más en lo que pueda asistirte o necesitas información adicional sobre algún tema?";
    }
    
    // Despedidas
    if (message.includes('adiós') || message.includes('chao') || message.includes('hasta luego') || message.includes('nos vemos') || message.includes('bye')) {
      return "¡Ha sido un gusto ayudarte! 👋 Si necesitas más información, aquí estaré. ¡Que tengas excelente día!";
    }
    
    // Preguntas personales al bot
    if (message.includes('quién eres') || message.includes('que eres') || message.includes('tú nombre') || message.includes('tu nombre')) {
      return "Soy tu asistente virtual especializado en bienes raíces en Chile 🏠. Mi propósito es ayudarte a encontrar la propiedad perfecta, resolver tus dudas y guiarte en el proceso de compra/venta. ¡No dudes en preguntarme cualquier cosa!";
    }
    
    // Preguntas sobre la empresa
    if (message.includes('empresa') || message.includes('compañía') || message.includes('quiénes son') || message.includes('quienes son')) {
      return "Somos una empresa líder en bienes raíces en Chile con más de 10 años de experiencia. Nos especializamos en:\n\n• Compra y venta de propiedades\n• Asesoría de inversiones\n• Tasaciones profesionales\n• Gestión de arriendos\n• Proyectos nuevos\n\n¿Te interesa conocer más sobre nuestros servicios?";
    }
    
    // Contacto y seguimiento
    if (message.includes('contacto') || message.includes('llamar') || message.includes('teléfono') || message.includes('correo') || message.includes('email') || message.includes('whatsapp')) {
      return "📞 ¡Claro! Tenemos varios canales de contacto:\n\n• Teléfono: +56 2 2345 6789\n• WhatsApp: +56 9 8765 4321\n• Email: contacto@inmobiliaria.cl\n• Oficina: Av. Principal 123, Santiago\n\n¿Prefieres que te contactemos nosotros?";
    }
    
    // Respuesta por defecto - más amigable y que invite a continuar
    return "🤔 No estoy seguro de entender completamente tu pregunta. Como asistente de bienes raíces, puedo ayudarte con:\n\n• Búsqueda de propiedades 🏠\n• Información de financiamiento 💰\n• Agendar visitas 📅\n• Asesoría en compra/venta 📈\n• Dudas sobre el proceso 📋\n\n¿Podrías contarme más específicamente qué necesitas o reformular tu pregunta?";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage = { 
      text: inputMessage, 
      isUser: true, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simular typing del bot
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = { 
        text: getBotResponse(inputMessage), 
        isUser: false, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mensaje de bienvenida automático
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          text: "¡Hola! 👋 Soy tu asistente virtual de bienes raíces. Estoy aquí para ayudarte a encontrar la propiedad perfecta en Chile.\n\nPuedo asistirte con:\n• Búsqueda de propiedades 🏠\n• Información de financiamiento 💰\n• Agendar visitas 📅\n• Asesoría en compra/venta 📈\n• Resolver todas tus dudas\n\n¿En qué puedo ayudarte hoy?",
          isUser: false,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen]);

  return (
    <>
      {/* Botón flotante del chatbot - Mismo estilo que WhatsApp */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          {/* Efecto de pulso/ping - Igual que WhatsApp */}
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Botón principal */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center"
            aria-label="Abrir chat de asistencia"
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="transform hover:rotate-12 transition-transform duration-300"
            >
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200 transform transition-all duration-300">
          {/* Header del chat */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Asistente Inmobiliario</h3>
                <p className="text-sm text-blue-100">En línea • Te ayuda a encontrar tu hogar</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition-colors duration-200"
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
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap text-sm">{line}</p>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {message.isUser ? 'Tú' : 'Asistente'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
            
            {/* Indicador de typing */}
            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    <span className="text-xs text-gray-500 ml-2">escribiendo...</span>
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
                placeholder="Escribe tu mensaje..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Responde en segundos • Asistencia 24/7
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;