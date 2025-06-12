import React, { useState, useEffect } from 'react';

const initialItems = [
  "Pasaporte",
  "Visa de estudiante",
  "Carta de aceptación",
  "Ropa adecuada para el clima",
  "Adaptador de corriente",
  "Laptop y cargador",
  "Seguro médico",
  "Dinero en efectivo",
  "Tarjeta bancaria internacional",
  "Recetas médicas o medicamentos",
];

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('travel-list');
    return saved ? JSON.parse(saved) : initialItems.map(name => ({ name, checked: false }));
  });

  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('travel-list', JSON.stringify(items));
  }, [items]);

  const toggleItem = (index) => {
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  };

  const addItem = () => {
    if (newItem.trim() === '') return;
    setItems([...items, { name: newItem.trim(), checked: false }]);
    setNewItem('');
  };

  const deleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      backgroundColor: '#f7f7f7',
      minHeight: '100vh',
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: 0}}>
        Lista de viaje para estudiantes de intercambio
      </h1>
      <h4 style={{ textAlign: 'center', color: 'blue', marginTop: '0.5rem', marginBottom: '2rem' }}>
        Imanol Armando González Solís - A00835759
      </h4>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem auto',
        gap: '0.5rem',
        maxWidth: '500px',
      }}>
        <input
          type="text"
          placeholder="Nuevo artículo..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button onClick={addItem} style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2ecc71',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Agregar
        </button>
      </div>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        maxWidth: '500px',
        margin: '2rem auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}>
        {items.map((item, index) => (
          <li key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            borderBottom: '1px solid #eee',
          }}>
            <label style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(index)}
                style={{ marginRight: '1rem' }}
              />
              <span style={{
                textDecoration: item.checked ? 'line-through' : 'none',
                color: item.checked ? '#999' : '#333',
              }}>
                {item.name}
              </span>
            </label>
            <button onClick={() => deleteItem(index)} style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer',
            }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
