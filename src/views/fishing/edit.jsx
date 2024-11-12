import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function FishingEdit() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(null);
  const [harga, setHarga] = useState("");
  const [lokasi, setLokasi] = useState("");

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch Fishing details
  const fetchDetailFishing = async () => {
    await api.get(`/api/fishings/${id}`).then((response) => {
      setNama(response.data.data.nama);
      setDeskripsi(response.data.data.deskripsi);
      setHarga(response.data.data.harga);
      setLokasi(response.data.data.lokasi);
    });
  };

  useEffect(() => {
    fetchDetailFishing();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Update Fishing method
  const updateFishing = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga);
    formData.append("lokasi", lokasi);
    
    if (image) {
      formData.append("image", image);  // Use 'gambar' to match the backend's expected field name
    }

    formData.append("_method", "PUT");

    await api
      .post(`/api/fishings/${id}`, formData)  // Make sure to use POST method for form data
      .then(() => {
        navigate("/fishings");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={updateFishing}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Gambar</label>
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
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Fishing"
                  />
                  {errors.nama && (
                    <div className="alert alert-danger mt-2">
                      {errors.nama[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Deskripsi</label>
                  <textarea
                    className="form-control"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows="5"
                    placeholder="Deskripsi Fishing"
                  ></textarea>
                  {errors.deskripsi && (
                    <div className="alert alert-danger mt-2">
                      {errors.deskripsi[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Harga</label>
                  <input
                    type="text"
                    className="form-control"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Harga Fishing"
                  />
                  {errors.harga && (
                    <div className="alert alert-danger mt-2">
                      {errors.harga[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Lokasi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="Lokasi Fishing"
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
