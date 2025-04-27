"use client";
import { useState } from "react";
import { client } from "@/lib/client";
import { CalculateRequest, Operator } from "@/gen/calculator/v1/calculator_pb";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operator, setOperator] = useState<Operator>(Operator.ADD);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    
    // 输入验证
    if (isNaN(numA) || isNaN(numB)) {
      setError("请输入有效的数字");
      return;
    }

    try {
      const response = await client.calculate({
        a: numA,
        b: numB,
        operator,
      });
      setResult(response.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发生未知错误");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">ConnectRPC计算器</h1>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value.replace(/[^0-9.-]/g, ""))}
            placeholder="输入数字A"
            className="flex-1 p-2 border rounded"
            required
          />
          <select
            value={operator}
            onChange={(e) => setOperator(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={Operator.ADD}>+</option>
            <option value={Operator.SUBTRACT}>-</option>
            <option value={Operator.MULTIPLY}>×</option>
            <option value={Operator.DIVIDE}>÷</option>
          </select>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value.replace(/[^0-9.-]/g, ""))}
            placeholder="输入数字B"
            className="flex-1 p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          计算
        </button>
      </form>

      {result !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-xl font-semibold">结果: {result}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          错误: {error}
        </div>
      )}
    </div>
  );
}