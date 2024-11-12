// import useState and useEffect
import { useState, useEffect } from "react";

// import api
import api from "../../api";

// import Link
import { Link } from "react-router-dom";

export default function FishingIndex() {
  // ini state
  const [fishings, setFishings] = useState([]);

  // define method
  const fetchDataFishings = async () => {
    // fetch data from API with Axios
    await api.get("/api/fishings").then((response) => {
      // assign response data to state "fishings"
      setFishings(response.data.data.data);
    });
  };

  // run hook useEffect
  useEffect(() => {
    // call method "fetchDataFishings"
    fetchDataFishings();
  }, []);

  // method deleteFishing
  const deleteFishing = async (id) => {
    // delete with api
    await api.delete(`/api/fishings/${id}`).then(() => {
      // call method "fetchDataFishings"
      fetchDataFishings();
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Data Fishing</h3>
        <Link to="/fishings/create" className="btn btn-md btn-success shadow text-white">
          Tambah Data
        </Link>
      </div>

      <div className="row">
        {fishings.length > 0 ? (
          fishings.map((fishing, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 border-0 rounded shadow">
                <img
                  src={fishing.image}
                  alt={fishing.nama}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{fishing.nama}</h5>
                  <p className="card-text">{fishing.deskripsi}</p>
                  <p className="text-muted">Harga: {fishing.harga}</p>
                  <p className="text-muted">Lokasi: {fishing.lokasi}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link
                    to={`/fishings/edit/${fishing.id}`}
                    className="btn btn-sm btn-primary rounded-sm shadow border-0"
                  >
                    EDIT
                  </Link>
                  <button
                    onClick={() => deleteFishing(fishing.id)}
                    className="btn btn-sm btn-danger rounded-sm shadow border-0"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-danger text-center">Data Belum Tersedia!</div>
          </div>
        )}
      </div>
    </div>
  );
}
