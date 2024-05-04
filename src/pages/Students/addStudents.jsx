import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo } from "../../api/auth";
import Layout from "../../components/layout";
import DashLayout from "../../components/dashlayout";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import "../../pages/dash.css";
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
import crudData from "../../config/apiService";
import axios from "axios";
import StudentTables from "./StudentTables";
axios.defaults.withCredentials = true;

const ViewStudents = () => {
  const [centre, setCentre] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [error, setError] = useState(false);
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

  const [batchesData, setBatchesData] = useState([]);
  const [centresData, setCentresData] = useState([]);
  const [values, setValues] = useState({
    studentId: "",
    name: "",
    contact: "",
    address: "",
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

  const handleChangeCentre = async (event) => {
    setCentre(event.target.value);

    event.preventDefault();
    try {
      const data = await crudData(
        "/get-batches",
        "POST",
        { centre: event.target.value },
        "studentEngine"
      );
      setBatch("");
      setError("");
      // console.log(data.message.users);
      // Filter the batches based on the selected centre
      setBatchesData(data.message.users);
    } catch (error) {
      setBatchesData("");
      setError(error.message);
      console.error("Error fetching batches:", error);
    }
  };

  const handleChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(centre);
      console.log(batch);
      console.log(values.studentId);
      console.log(values.name);
      console.log(values.contact);
      console.log(values.address);
      setCentre(""); // Reset centre dropdown
      setBatch("");
      setValues({ studentId: "", name: "", contact: "", address: "" });

      //   const data = await crudData(
      //     "/add-students",
      //     "POST",
      //     { batch: batch },
      //     "studentEngine"
      //   );
      //   setStudentsData(data.message.users);
      //   console.log(data.message.users);
    } catch (error) {
      console.error("Error fetching Students: ", error);
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
              Add Student
            </Typography>
            <FormControl fullWidth sx={{ width: "100%" }}>
              <InputLabel id="demo-centre-select-label">Centre</InputLabel>
              <Select
                labelId="demo-centre-select-label"
                id="demo-centre-select"
                value={centre}
                label="Centre"
                onChange={handleChangeCentre}
              >
                {centresData.map((centre) => (
                  <MenuItem key={centre.id} value={centre.centre_id}>
                    {centre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="error" style={{ color: "red", margin: "5px 0px" }}>
              {error}
            </div>

            {batchesData.length > 0 && (
              <FormControl fullWidth sx={{ width: "100%" }}>
                <InputLabel id="demo-batch-select-label">Batch</InputLabel>
                <Select
                  labelId="demo-batch-select-label"
                  id="demo-batch-select"
                  value={batch}
                  label="Batch"
                  onChange={handleChangeBatch}
                >
                  {batchesData.map((option) => (
                    <MenuItem key={option.id} value={option.batch_id}>
                      {option.batch_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {batchesData.length > 0 && (
              <>
                <TextField
                  label="Student ID"
                  variant="outlined"
                  value={values.studentId}
                  onChange={(e) => onChange(e)}
                  name="studentId"
                  fullWidth
                />
                <TextField
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  onChange={(e) => onChange(e)}
                  name="name"
                  fullWidth
                />
                <TextField
                  label="Contact"
                  variant="outlined"
                  value={values.contact}
                  onChange={(e) => onChange(e)}
                  name="contact"
                  fullWidth
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  value={values.address}
                  onChange={(e) => onChange(e)}
                  name="address"
                  fullWidth
                />
              </>
            )}

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                !centre ||
                !batch ||
                !values.studentId ||
                !values.name ||
                !values.contact ||
                !values.address
              }
              sx={{ width: "100%" }}
            >
              Submit
            </Button>
          </Box>
        </DashLayout>
      </div>
      {/* <div style={{ padding: "20px" }}>
        <StudentTables students={studentsData} />
      </div> */}
    </>
  );
};

export default ViewStudents;
