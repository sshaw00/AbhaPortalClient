import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo } from "../api/auth";
import Layout from "../components/layout";
import DashLayout from "../components/dashlayout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import "../pages/dash.css";
import * as React from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import crudData from "../config/apiService";
import axios from "axios";
// import StudentTables from "./StudentTables";
axios.defaults.withCredentials = true;

const AddBatches = () => {
  const [centre, setCentre] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  // const [batchOptions, setBatchOptions] = React.useState([]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(true);

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {}
  };

  const [success, setSuccess] = useState(false);
  const [centresData, setCentresData] = useState([]);
  const [values, setValues] = useState({
    batch_id: "",
    batch_name: "",
  });

  // Define a useEffect hook to fetch the data when the component mounts
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const rows = await crudData("/get-centres", "GET", "", "studentEngine");
        // console.log(rows);
        setCentresData(rows.message.users); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching centres:", error);
      }
    };
    fetchCentres();
  }, []);

  const handleChangeCentre = (event) => {
    const selectedCentre = centresData.find(
      (centre) => centre.centre_id === event.target.value
    );

    setCentre({
      id: event.target.value,
      name: selectedCentre.name,
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(centre.id);
      console.log(centre.name);
      console.log(values.batch_id);
      console.log(values.batch_name);

      const requestData = {
        ...values,
        centre_id: centre.id,
        // centre_name: centre.name,
      };
      const data = await crudData(
        "/add-batches",
        "POST",
        requestData,
        "studentEngine"
      );
      setError2("");
      setSuccess(data.message.message);
      // console.log(data.message.message);
      setCentre(""); // Reset centre dropdown
      setValues({ batch_id: "", batch_name: "" });
    } catch (error) {
      setError2(error.message);
      setSuccess("");
      console.log(error.message);
    }
  };
  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <DashLayout>
      <h1>Loading...</h1>
    </DashLayout>
  ) : (
    <>
      <div>
        <DashLayout>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              border: "1px solid #ccc",
              padding: "16px",
              justifyContent: "center",
              width: "100%",
              maxWidth: "90vw",
              margin: "0 9vw 0 9vw",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Add Batch
            </Typography>
            <FormControl fullWidth sx={{ width: "100%" }}>
              <InputLabel id="demo-centre-select-label">Centre</InputLabel>
              <Select
                labelId="demo-centre-select-label"
                id="demo-centre-select"
                value={centre.id}
                label="Centre"
                name="centre"
                onChange={handleChangeCentre}
                required
              >
                {centresData.map((centre) => (
                  <MenuItem key={centre.id} value={centre.centre_id}>
                    {centre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* {batchesData.length > 0 && (
              <FormControl fullWidth sx={{ width: "100%" }}>
                <InputLabel id="demo-batch-select-label">Batch</InputLabel>
                <Select
                  labelId="demo-batch-select-label"
                  id="demo-batch-select"
                  value={batch.id}
                  label="Batch"
                  name="batch"
                  onChange={handleChangeBatch}
                >
                  {batchesData.map((option) => (
                    <MenuItem key={option.id} value={option.batch_id}>
                      {option.batch_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )} */}

            <TextField
              label="Batch ID"
              placeholder="BH00X"
              variant="outlined"
              value={values.batch_id}
              onChange={(e) => onChange(e)}
              name="batch_id"
              fullWidth
              required
            />
            <TextField
              label="Batch Name"
              variant="outlined"
              value={values.batch_name}
              onChange={(e) => onChange(e)}
              name="batch_name"
              fullWidth
              required
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!centre || !values.batch_id || !values.batch_name}
              sx={{ width: "100%" }}
            >
              Submit
            </Button>
            <div
              className="error"
              style={{ color: "green", margin: "10px 10px" }}
            >
              {success}
            </div>
            <div className="error" style={{ color: "red", margin: "5px 0px" }}>
              {error2}
            </div>
          </Box>
        </DashLayout>
      </div>
      {/* <div style={{ padding: "20px" }}>
        <StudentTables students={studentsData} />
      </div> */}
    </>
  );
};

export default AddBatches;
