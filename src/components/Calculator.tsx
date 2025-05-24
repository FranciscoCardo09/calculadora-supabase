import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Calculator() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOperation = async (operation: 'add' | 'subtract' | 'multiply' | 'divide') => {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('calculator', {
        body: {
          operation,
          num1: parseFloat(num1),
          num2: parseFloat(num2)
        }
      });
      if (error) throw error;
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="calc-simple-container">
      <h2 className="calc-title">Calculadora</h2>
      <div className="calc-fields">
        <input
          type="number"
          value={num1}
          onChange={e => setNum1(e.target.value)}
          placeholder="Primer número"
          className="calc-input"
          disabled={loading}
        />
        <input
          type="number"
          value={num2}
          onChange={e => setNum2(e.target.value)}
          placeholder="Segundo número"
          className="calc-input"
          disabled={loading}
        />
      </div>
      <div className="calc-btn-group">
        <button className="calc-btn sum" onClick={() => handleOperation('add')} disabled={loading}>+</button>
        <button className="calc-btn sub" onClick={() => handleOperation('subtract')} disabled={loading}>-</button>
        <button className="calc-btn mul" onClick={() => handleOperation('multiply')} disabled={loading}>×</button>
        <button className="calc-btn div" onClick={() => handleOperation('divide')} disabled={loading}>÷</button>
      </div>
      {error && <div className="calc-error">{error}</div>}
      {result !== null && (
        <div className="calc-result">Resultado: <span>{result}</span></div>
      )}
      <style>{`
        .calc-simple-container {
          max-width: 350px;
          margin: 3rem auto;
          background: #fff;
          border-radius: 1.2rem;
          box-shadow: 0 2px 12px rgba(60,200,150,0.08);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .calc-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #222;
          margin-bottom: 1.5rem;
        }
        .calc-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          margin-bottom: 1.2rem;
        }
        .calc-input {
          flex: 1;
          padding: 0.7rem 1rem;
          border: 1.5px solid #43c6ac;
          border-radius: 0.8rem;
          font-size: 1.1rem;
          outline: none;
          transition: border 0.2s;
        }
        .calc-input:focus {
          border: 1.5px solid #38f9d7;
        }
        .calc-btn-group {
          display: flex;
          gap: 0.7rem;
          margin-bottom: 1.2rem;
        }
        .calc-btn {
          font-size: 1.4rem;
          font-weight: bold;
          padding: 0.7rem 1.2rem;
          border: none;
          border-radius: 0.8rem;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          color: #fff;
        }
        .calc-btn.sum { background: #43c6ac; }
        .calc-btn.sub { background: #ff7675; }
        .calc-btn.mul { background: #a29bfe; }
        .calc-btn.div { background: #fdcb6e; color: #222; }
        .calc-btn:active {
          transform: scale(0.97);
        }
        .calc-error {
          color: #ff4d4f;
          margin-top: 0.5rem;
          font-weight: 500;
        }
        .calc-result {
          margin-top: 1.2rem;
          font-size: 1.3rem;
          font-weight: bold;
          color: #43c6ac;
          background: #f1fff9;
          border-radius: 0.7rem;
          padding: 0.7rem 1.2rem;
        }
        .calc-result span {
          font-size: 1.7rem;
          color: #222;
        }
      `}</style>
    </div>
  )
} 