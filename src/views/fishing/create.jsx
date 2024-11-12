// import useState
import { useState } from "react";

// import useNavigate
import { useNavigate } from "react-router-dom";

// import API
import api from "../../api";

export default function FishingCreate() {
  // define state
  const [image, setImage] = useState("");
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [lokasi, setLokasi] = useState("");

  // state validation
  const [errors, setErrors] = useState([]);

  // useNavigate
  const navigate = useNavigate();

  // method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // method store fishing
  const storeFishing = async (e) => {
    e.preventDefault();

    // init FormData
    const formData = new FormData();

    // append data
    formData.append("image", image);
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga);
    formData.append("lokasi", lokasi);

    // send data with API
    await api
      .post("/api/fishings", formData)
      .then(() => {
        // redirect to fishings index
        navigate("/fishings");
      })
      .catch((error) => {
        // set errors response to state "errors"
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={storeFishing}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {errors.image && (
                    <div className="alert alert-danger mt-2">
                      {errors.image[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Fishing Name"
                  />
                  {errors.nama && (
                    <div className="alert alert-danger mt-2">
                      {errors.nama[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows="5"
                    placeholder="Fishing Description"
                  ></textarea>
                  {errors.deskripsi && (
                    <div className="alert alert-danger mt-2">
                      {errors.deskripsi[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Harga"
                  />
                  {errors.harga && (
                    <div className="alert alert-danger mt-2">
                      {errors.harga[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="Location"
                  />
                  {errors.lokasi && (
                    <div className="alert alert-danger mt-2">
                      {errors.lokasi[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-sm shadow border-0"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
