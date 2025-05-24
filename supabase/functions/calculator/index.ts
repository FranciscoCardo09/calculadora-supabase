// @ts-nocheck
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface CalculatorRequest {
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
  num1: number
  num2: number
}

serve(async (req) => {
  // --- RESPONDER A OPTIONS (CORS preflight) ---
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }
  // --- FIN BLOQUE CORS ---

  try {
    const { operation, num1, num2 } = await req.json() as CalculatorRequest

    let result: number

    switch (operation) {
      case 'add':
        result = num1 + num2
        break
      case 'subtract':
        result = num1 - num2
        break
      case 'multiply':
        result = num1 * num2
        break
      case 'divide':
        if (num2 === 0) {
          throw new Error('Cannot divide by zero')
        }
        result = num1 / num2
        break
      default:
        throw new Error('Invalid operation')
    }

    return new Response(
      JSON.stringify({ result }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
})