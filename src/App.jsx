import { useState, useEffect } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'

function App() {
  const [crewmates, setCrewmates] = useState([])
  const [newCrewmate, setNewCrewmate] = useState({ name: '', category: '', color: '', accessory: '' })

  const supabaseUrl = ''
  const supabaseKey = ''
  const supabase = createClient(supabaseUrl, supabaseKey)

  const fetchCrewmates = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
    if (error) console.error('Error fetching crewmates:', error)
    else setCrewmates(data)
  }

  const addCrewmate = async () => {
    const { error } = await supabase
      .from('crewmates')
      .insert([newCrewmate])
    if (error) console.error('Error adding crewmate:', error)
    else fetchCrewmates()
  }

  const updateCrewmate = async (id, updatedCrewmate) => {
    const { error } = await supabase
      .from('crewmates')
      .update(updatedCrewmate)
      .eq('id', id)
    if (error) console.error('Error updating crewmate:', error)
    else fetchCrewmates()
  }

  const deleteCrewmate = async (id) => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id)
    if (error) console.error('Error deleting crewmate:', error)
    else fetchCrewmates()
  }

  useEffect(() => {
    fetchCrewmates()
  }, [])

  return (
    <div className="app">
      <h1>Crewmates</h1>
      <ul>
        {crewmates.map(crewmate => (
          <li key={crewmate.id} style={{ color: crewmate.color }}>
            {crewmate.name} - {crewmate.category} - {crewmate.accessory}
            <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
            <button onClick={() => updateCrewmate(crewmate.id, { name: 'Updated Name', category: 'Updated Category', color: 'blue', accessory: 'hat' })}>Update</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={newCrewmate.name}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newCrewmate.category}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Color"
        value={newCrewmate.color}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, color: e.target.value })}
      />
      <input
        type="text"
        placeholder="Accessory"
        value={newCrewmate.accessory}
        onChange={(e) => setNewCrewmate({ ...newCrewmate, accessory: e.target.value })}
      />
      <button onClick={addCrewmate}>Add Crewmate</button>
    </div>
  )
}

export default App;