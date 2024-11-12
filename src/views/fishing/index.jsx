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
      <div className="row">
        <div className="col-md-12">
          <Link
            to="/fishings/create"
            className="btn btn-md btn-success rounded shadow border-0 mb-3"
          >
            ADD NEW FISHING
          </Link>
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Location</th>
                    <th scope="col" style={{ width: "15%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fishings.length > 0 ? (
                    fishings.map((fishing, index) => (
                      <tr key={index}>
                        <td className="text-center">
                          <img
                            src={fishing.image}
                            alt={fishing.nama}
                            width="200"
                            className="rounded"
                          />
                        </td>
                        <td>{fishing.nama}</td>
                        <td>{fishing.deskripsi}</td>
                        <td>{fishing.harga}</td>
                        <td>{fishing.lokasi}</td>
                        <td className="text-center">
                          <Link
                            to={`/fishings/edit/${fishing.id}`}
                            className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                          >
                            EDIT
                          </Link>
                          <button
                            onClick={() => deleteFishing(fishing.id)}
                            className="btn btn-sm btn-danger rounded-sm shadow border-0"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
