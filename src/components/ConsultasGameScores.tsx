import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define el tipo de cada registro del game_score
interface GameScore {
  id: number;
  game_id: number;
  user_id: number;
  scene_time: string;
  score: number;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
}

function ConsultasGameScores() {
  const [listaScores, setListaScores] = useState<GameScore[]>([]);
  const [listaFiltrada, setListaFiltrada] = useState<GameScore[]>([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState<keyof GameScore>("id");
  const [pagina, setPagina] = useState(0);
  const [filasPagina] = useState(25);
  const [numPaginas, setNumPaginas] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "http://localhost/list_game_scores.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data: GameScore[]) => {
        setListaScores(data);
        setListaFiltrada(data);
        setNumPaginas(Math.ceil(data.length / filasPagina));
      });
  };

  const cargarDetalle = (id: number) => {
    localStorage.setItem("selectedScoreId", id.toString());
    navigate(`/consultasdetalles`);
  };

  const buscar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaScores.filter((item) =>
      item.user_id.toString().includes(textoB)
    );
    setListaFiltrada(resultado);
    setNumPaginas(Math.ceil(resultado.length / filasPagina));
    setPagina(0);
  };

  const seleccionarColumna = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const columnaSeleccionada = (event.currentTarget as HTMLElement).dataset.columna as keyof GameScore;
    if (!columnaSeleccionada) return;

    let asc = ascendente;
    if (columnaAnterior === columnaSeleccionada) {
      asc = -asc;
    } else {
      asc = 1;
    }

    setAscendente(asc);
    setColumnaAnterior(columnaSeleccionada);

    setListaFiltrada(
      [...listaFiltrada].sort((a, b) => {
        const valA = a[columnaSeleccionada];
        const valB = b[columnaSeleccionada];
        return valA < valB ? -asc : valA > valB ? asc : 0;
      })
    );
  };

  const avanzar = () => {
    if (pagina < numPaginas - 1) {
      setPagina(pagina + 1);
    }
  };

  const retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const generarPaginacion = () => {
    const items = [];
    for (let i = 0; i < numPaginas; i++) {
      items.push(
        <li key={i} className={`page-item ${pagina === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => setPagina(i)}>
            {i + 1}
          </button>
        </li>
      );
    }
    return items;
  };

  const dibujarTabla = () => {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th data-columna="id" onClick={seleccionarColumna}>ID</th>
            <th data-columna="game_id" onClick={seleccionarColumna}>Game</th>
            <th data-columna="user_id" onClick={seleccionarColumna}>User</th>
            <th data-columna="scene_time" onClick={seleccionarColumna}>Time</th>
            <th data-columna="score" onClick={seleccionarColumna}>Score</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((item) => (
              <tr key={item.id} onClick={() => cargarDetalle(item.id)}>
                <td>{item.id}</td>
                <td>{item.game_id}</td>
                <td>{item.user_id}</td>
                <td>{item.scene_time}</td>
                <td>{item.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <section className="p-4">
      <div className="container">
        <input
          type="text"
          value={textoBuscar}
          onChange={buscar}
          className="form-control mb-3"
          placeholder="Buscar por user_id..."
        />
        {dibujarTabla()}
        <nav>
          <ul className="pagination">
            <li className={`page-item ${pagina === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={retroceder}>Anterior</button>
            </li>
            {generarPaginacion()}
            <li className={`page-item ${pagina === numPaginas - 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={avanzar}>Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default ConsultasGameScores;
