import React, { useEffect, useState } from 'react';

function ConsultasGameScores() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost/list_game_scores.php")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  return (
    <div className="container">
      <h2>Lista de Puntajes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Game</th>
            <th>User</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={5}>Cargando datos...</td></tr>
          ) : (
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.game_id}</td>
                <td>{item.user_id}</td>
                <td>{item.scene_time}</td>
                <td>{item.score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ConsultasGameScores;