import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficosDashboard = () => {
  const data = [
    { name: 'Enero', uv: 4000, prueba: 2400, amt: 2400 },
    { name: 'Febrero', uv: 3000, prueba: 1398, amt: 2210 },
    { name: 'Marzo', uv: 2000, prueba: 9800, amt: 2290 },
    { name: 'Abril', uv: 2780, prueba: 3908, amt: 2000 },
    { name: 'Mayo', uv: 1890, prueba: 4800, amt: 2181 },
    { name: 'Junio', uv: 2390, prueba: 3800, amt: 2500 },
    { name: 'Julio', uv: 3490, prueba: 4300, amt: 2100 },
  ];
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="prueba" stroke="#8884d8" activeDot={{ r: 8 }} />
       
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraficosDashboard
