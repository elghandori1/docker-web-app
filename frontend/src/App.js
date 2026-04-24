import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
      });
      setCompletedTasks(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  return (
    <>
      <style>
        {`
          * {
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            user-select: none;
          }
          
          input {
            -webkit-user-select: text;
            user-select: text;
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInMobile {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes deleteShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .task-item:active {
            transform: scale(0.98) !important;
          }
          
          .checkbox-area:active {
            transform: scale(1.1);
          }
          
          .delete-btn:active {
            animation: deleteShake 0.3s ease;
          }
          
          .add-btn:active {
            transform: scale(0.95) !important;
          }
          
          @media (max-width: 768px) {
            .card {
              border-radius: 20px 20px 0 0 !important;
              max-width: 100% !important;
            }
            
            .task-list::-webkit-scrollbar {
              width: 3px;
            }
            
            .task-list::-webkit-scrollbar-track {
              background: transparent;
            }
            
            .task-list::-webkit-scrollbar-thumb {
              background: rgba(99, 102, 241, 0.3);
              border-radius: 10px;
            }
          }
          
          @media (max-width: 480px) {
            .card {
              border-radius: 16px !important;
              margin: 10px !important;
            }
          }
        `}
      </style>

      <div style={{
        ...styles.container,
        padding: isMobile ? '12px' : '20px',
        alignItems: isMobile ? 'flex-start' : 'center',
        paddingTop: isMobile ? '20px' : '20px'
      }}>
        <div style={styles.glow}></div>
        <div style={styles.glow2}></div>
        
        <div style={{
          ...styles.card,
          maxWidth: isMobile ? '100%' : '480px',
          margin: isMobile ? '0' : '0 auto',
          borderRadius: isMobile ? '20px' : '24px'
        }}>
          <div style={{
            ...styles.header,
            padding: isMobile ? '24px 20px 16px' : '32px 32px 20px'
          }}>
            <div style={{
              ...styles.iconContainer,
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              borderRadius: isMobile ? '12px' : '16px',
              marginBottom: isMobile ? '12px' : '16px'
            }}>
              <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
              </svg>
            </div>
            <h2 style={{
              ...styles.title,
              fontSize: isMobile ? '24px' : '28px'
            }}>
              TaskFlow
            </h2>
            <p style={{
              ...styles.subtitle,
              fontSize: isMobile ? '12px' : '14px'
            }}>
              Stay organized, stay ahead
            </p>
          </div>

          <div style={{
            ...styles.inputContainer,
            padding: isMobile ? '16px 20px' : '24px 32px'
          }}>
            <div style={{
              ...styles.inputWrapper,
              gap: isMobile ? '8px' : '12px',
              borderRadius: isMobile ? '12px' : '16px'
            }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="What needs to be done?"
                style={{
                  ...styles.input,
                  padding: isMobile ? '12px 14px' : '14px 16px',
                  fontSize: isMobile ? '15px' : '16px'
                }}
              />
              <button 
                onClick={addTask} 
                className="add-btn"
                style={{
                  ...styles.addButton,
                  padding: isMobile ? '10px' : '12px',
                  borderRadius: isMobile ? '10px' : '12px',
                  minWidth: isMobile ? '40px' : '44px',
                  minHeight: isMobile ? '40px' : '44px'
                }}
              >
                <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              ...styles.errorContainer,
              padding: isMobile ? '10px 20px' : '12px 32px',
              margin: isMobile ? '0 20px' : '0 32px',
              fontSize: isMobile ? '13px' : '14px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <span>Loading tasks...</span>
            </div>
          )}

          <div style={{
            ...styles.taskList,
            padding: isMobile ? '0 20px' : '0 32px',
            maxHeight: isMobile ? 'calc(100vh - 380px)' : '400px',
            minHeight: isMobile ? '150px' : '200px'
          }} className="task-list">
            {tasks.length === 0 && !loading && (
              <div style={{
                ...styles.emptyState,
                padding: isMobile ? '30px 20px' : '40px 20px'
              }}>
                <svg width={isMobile ? "40" : "48"} height={isMobile ? "40" : "48"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <p style={{
                  ...styles.emptyText,
                  fontSize: isMobile ? '16px' : '18px'
                }}>
                  No tasks yet
                </p>
                <p style={{
                  ...styles.emptySubtext,
                  fontSize: isMobile ? '13px' : '14px'
                }}>
                  Add your first task above
                </p>
              </div>
            )}

            <ul style={styles.list}>
              {tasks.map((task, index) => {
                const isCompleted = completedTasks[task.id] || false;
                
                return (
                  <li 
                    key={task.id} 
                    className="task-item"
                    style={{
                      ...styles.taskItem,
                      animation: `${isMobile ? 'slideInMobile' : 'slideIn'} 0.3s ease-out ${index * 0.1}s both`,
                      opacity: isCompleted ? 0.6 : 1,
                      padding: isMobile ? '12px 14px' : '16px',
                      marginBottom: isMobile ? '6px' : '8px',
                      borderRadius: isMobile ? '10px' : '12px',
                      touchAction: 'manipulation'
                    }}
                  >
                    <div style={{
                      ...styles.taskContent,
                      gap: isMobile ? '10px' : '12px'
                    }}>
                      <div 
                        className="checkbox-area"
                        style={{
                          ...styles.checkbox,
                          background: isCompleted ? '#4f46e5' : 'transparent',
                          borderColor: isCompleted ? '#4f46e5' : 'rgba(255, 255, 255, 0.2)',
                          width: isMobile ? '20px' : '22px',
                          height: isMobile ? '20px' : '22px',
                          minWidth: isMobile ? '20px' : '22px'
                        }}
                        onClick={() => toggleTask(task.id)}
                      >
                        {isCompleted && (
                          <svg width={isMobile ? "10" : "12"} height={isMobile ? "10" : "12"} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span style={{
                        ...styles.taskText,
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        color: isCompleted ? '#52525b' : '#e4e4e7',
                        fontSize: isMobile ? '14px' : '15px',
                        wordBreak: 'break-word',
                        flex: 1
                      }}>
                        {task.title}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="delete-btn"
                      style={{
                        ...styles.deleteButton,
                        background: 'rgba(239, 68, 68, 0.5)',
                        color: '#fff',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        padding: isMobile ? '6px' : '8px',
                        marginLeft: isMobile ? '8px' : '12px',
                        minWidth: isMobile ? '32px' : '36px',
                        minHeight: isMobile ? '32px' : '36px'
                      }}
                      title="Delete task"
                    >
                      <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div style={{
            ...styles.footer,
            padding: isMobile ? '12px 20px' : '16px 32px'
          }}>
            <span style={{
              ...styles.taskCount,
              fontSize: isMobile ? '12px' : '13px'
            }}>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} • {
                Object.values(completedTasks).filter(Boolean).length
              } completed
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    position: "relative",
    overflow: "hidden",
    width: "100%"
  },
  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
    top: "10%",
    right: "60%",
    pointerEvents: "none"
  },
  glow2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
    bottom: "20%",
    left: "55%",
    pointerEvents: "none"
  },
  card: {
    width: "100%",
    background: "rgba(30, 30, 45, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
    position: "relative",
    zIndex: 1
  },
  header: {
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
  },
  iconContainer: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    color: "#fff",
    boxShadow: "0 8px 16px -4px rgba(99, 102, 241, 0.4)"
  },
  title: {
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    color: "#a1a1aa",
    margin: 0,
    fontWeight: "400"
  },
  inputContainer: {},
  inputWrapper: {
    display: "flex",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "border-color 0.3s ease"
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    color: "#fff",
    outline: "none",
    fontFamily: "inherit"
  },
  addButton: {
    border: "none",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "12px",
    color: "#fca5a5",
    fontWeight: "500"
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "32px",
    color: "#a1a1aa",
    fontSize: "14px"
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(99, 102, 241, 0.2)",
    borderTopColor: "#6366f1",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  taskList: {
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch"
  },
  emptyState: {
    textAlign: "center",
    color: "#52525b"
  },
  emptyText: {
    fontWeight: "600",
    color: "#a1a1aa",
    margin: "16px 0 8px"
  },
  emptySubtext: {
    color: "#71717a",
    margin: 0
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
    cursor: "default"
  },
  taskContent: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 0
  },
  checkbox: {
    borderRadius: "6px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  taskText: {
    fontWeight: "500",
    transition: "all 0.3s ease"
  },
  deleteButton: {
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    textAlign: "center"
  },
  taskCount: {
    color: "#52525b",
    fontWeight: "500"
  }
};

export default App;