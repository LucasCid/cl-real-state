// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    // Si no hay API key, usar sistema de respuestas inteligentes
    if (!apiKey) {
      console.log('⚠️ No hay API Key, usando sistema de reglas');
      const fallbackResponse = generateSmartResponse(message);
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ message: fallbackResponse });
    }

    console.log('🤖 Llamando a Google Gemini AI...');

    try {
      // Endpoint actualizado con modelo que SÍ existe
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Eres un asistente virtual especializado en bienes raíces en Chile. Ayudas a usuarios a encontrar propiedades, asesorar sobre precios, financiamiento y agendar visitas. Sé amable, profesional y responde SIEMPRE en español de forma concisa (máximo 4-5 oraciones).

Pregunta del usuario: ${message}`
              }]
            }]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Error de Gemini:', data);
        
        // Si falla Gemini, usar sistema de respaldo
        console.log('🔄 Usando sistema de respaldo...');
        const fallbackResponse = generateSmartResponse(message);
        return NextResponse.json({ message: fallbackResponse });
      }

      // Extraer la respuesta de Gemini
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        console.log('📭 Respuesta vacía de Gemini, usando respaldo');
        const fallbackResponse = generateSmartResponse(message);
        return NextResponse.json({ message: fallbackResponse });
      }

      console.log('✅ Respuesta de IA real recibida');
      
      return NextResponse.json({
        message: aiResponse.trim()
      });

    } catch (fetchError) {
      console.error('💥 Error al llamar Gemini:', fetchError);
      const fallbackResponse = generateSmartResponse(message);
      return NextResponse.json({ message: fallbackResponse });
    }

  } catch (error) {
    console.error('💥 Error general:', error);
    return NextResponse.json({
      message: 'Estoy aquí para ayudarte con propiedades en Chile. ¿Qué necesitas saber?'
    });
  }
}

// Sistema de respaldo inteligente
function generateSmartResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  if (/^(hola|hi|hey|buenos|qué tal)/i.test(lowerMessage)) {
    return 'Hola! Soy tu asistente inmobiliario. Puedo ayudarte con propiedades en venta, arriendo, precios por zona, financiamiento y agendar visitas. ¿Qué te gustaría saber?';
  }

  if (lowerMessage.includes('comprar') || lowerMessage.includes('compra')) {
    if (lowerMessage.includes('casa')) {
      return 'Excelente! Tenemos casas en venta en diversas comunas. ¿En qué zona te interesa? (Providencia, Las Condes, Maipú, etc.) y ¿cuál es tu presupuesto aproximado?';
    }
    if (lowerMessage.includes('departamento') || lowerMessage.includes('depto')) {
      return 'Perfecto! Tenemos departamentos en venta. ¿Cuántos dormitorios necesitas? ¿En qué comuna buscas? ¿Cuál es tu presupuesto?';
    }
    return 'Excelente decisión de comprar! ¿Qué tipo de propiedad buscas? (casa, departamento, terreno) y ¿en qué zona?';
  }

  if (lowerMessage.includes('arriendo') || lowerMessage.includes('alquiler')) {
    return 'Tenemos opciones de arriendo disponibles. ¿Qué tipo de propiedad buscas? ¿Cuántos dormitorios? ¿En qué zona? ¿Cuál es tu presupuesto mensual?';
  }

  if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto')) {
    return 'Los precios varían según zona y tipo de propiedad. Por ejemplo: Santiago Centro $2.5M-$3.5M/m², Providencia $3.5M-$4.5M/m², Las Condes $4M-$5.5M/m². ¿En qué comuna específica te interesa?';
  }

  if (lowerMessage.includes('financiamiento') || lowerMessage.includes('crédito')) {
    return 'Ofrecemos asesoría en financiamiento: crédito hipotecario tradicional, subsidios del Estado (DS1, DS19), crédito con pie reducido. ¿Tienes pie ahorrado? ¿Cuál es tu renta mensual?';
  }

  if (lowerMessage.includes('visita') || lowerMessage.includes('ver')) {
    return 'Genial! Podemos agendar una visita. ¿Qué propiedad te interesa? ¿Qué días tienes disponibilidad? También puedes llamarnos o escribirnos por WhatsApp para agendar más rápido.';
  }

  const comunas = ['providencia', 'las condes', 'vitacura', 'ñuñoa', 'santiago', 'maipú'];
  const comunaMencionada = comunas.find(c => lowerMessage.includes(c));
  
  if (comunaMencionada) {
    const comunaCap = comunaMencionada.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    return `${comunaCap} es excelente! Tiene buena conectividad y servicios. ¿Qué tipo de propiedad buscas ahí? ¿Para compra o arriendo? ¿Cuál es tu presupuesto?`;
  }

  return 'Estoy aquí para ayudarte a encontrar tu propiedad ideal en Chile. Puedo asesorarte sobre propiedades disponibles, precios por zona, financiamiento y agendar visitas. ¿Qué necesitas saber?';
}