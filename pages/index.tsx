import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tasks:', error)
      return
    }

    setTasks(data)
  }

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const response = await fetch('/api/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newTask }),
    })

    if (response.ok) {
      setNewTask('')
      fetchTasks()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-6">SnapTask</h1>
                <form onSubmit={addTask} className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </form>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                  <div className="space-y-2">
                    {tasks.map((task: any) => (
                      <div
                        key={task.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="text-gray-700">{task.content}</p>
                        <small className="text-gray-500 mt-1 block">
                          {new Date(task.created_at).toLocaleString()}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
