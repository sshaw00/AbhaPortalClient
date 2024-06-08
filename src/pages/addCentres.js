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
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  // const [batchOptions, setBatchOptions] = React.useState([]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(true);

  const logout = async () => {
    try {
      await crudData("/logout", "GET", "", "authEngine");

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.message);
    }
  };
  const protectedInfo = async () => {
    try {
      const data = await crudData("/protected", "GET", "", "authEngine");

      setProtectedData(data.message.info);

      setLoading(false);
    } catch (error) {
      // logout();
    }
  };
  const [centreType, setCentreType] = useState("");
  const [success, setSuccess] = useState(false);
  const [centresData, setCentresData] = useState([]);
  const [values, setValues] = useState({
    number: "",
    name: "",
    address: "",
    pocName: "",
    pocPhone: "",
    pocEmail: "",
  });

  const handleCentreTypeChange = (event) => {
    setCentreType(event.target.value);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values.number);
      console.log(values.name);
      console.log(centreType);
      console.log(values.address);
      console.log(values.pocName);
      console.log(values.pocPhone);
      console.log(values.pocEmail);

      const requestData = {
        ...values,
        centre_type: centreType,
      };
      const data = await crudData(
        "/add-centre",
        "POST",
        requestData,
        "authEngine"
      );
      setError2("");
      setSuccess(data.message.message);
      // console.log(data.message.message);
      setCentreType(""); // Reset centre dropdown
      setValues({
        name: "",
        number: "",
        address: "",
        pocName: "",
        pocEmail: "",
        pocPhone: "",
      });
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
              Add New Centre
            </Typography>
            <FormControl fullWidth sx={{ width: "100%" }}>
              {/* <InputLabel id="demo-centre-select-label">Centre</InputLabel>
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
              </Select> */}
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
              label="Centre ID"
              placeholder="AAF00X"
              variant="outlined"
              value={values.number}
              onChange={(e) => onChange(e)}
              name="number"
              fullWidth
              required
            />
            <TextField
              label="Centre Name"
              variant="outlined"
              value={values.name}
              onChange={(e) => onChange(e)}
              name="name"
              fullWidth
              required
            />

            <FormControl fullWidth sx={{ width: "100%" }}>
              <InputLabel id="centre-type-label">Centre Type</InputLabel>
              <Select
                labelId="centre-type-label"
                id="centre-type-select"
                value={centreType}
                label="Centre Type"
                onChange={handleCentreTypeChange}
                required
              >
                <MenuItem value="Abha Centre">Abha Centre</MenuItem>
                <MenuItem value="Partner Centre">Partner Centre</MenuItem>
              </Select>
            </FormControl>

            {centreType && (
              <FormControl fullWidth sx={{ width: "100%" }}>
                <TextField
                  label="Centre Address"
                  variant="outlined"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  fullWidth
                  required
                />
              </FormControl>
            )}

            {centreType === "Partner Centre" && (
              <>
                <FormControl fullWidth sx={{ width: "100%" }}>
                  <TextField
                    label="POC Name"
                    variant="outlined"
                    value={values.pocName}
                    onChange={onChange}
                    name="pocName"
                    fullWidth
                    required
                  />
                </FormControl>

                <FormControl fullWidth sx={{ width: "100%" }}>
                  <TextField
                    label="POC Phone"
                    variant="outlined"
                    value={values.pocPhone}
                    onChange={onChange}
                    name="pocPhone"
                    fullWidth
                    required
                  />
                </FormControl>

                <FormControl fullWidth sx={{ width: "100%" }}>
                  <TextField
                    label="POC Email"
                    variant="outlined"
                    value={values.pocEmail}
                    onChange={onChange}
                    name="pocEmail"
                    fullWidth
                    required
                  />
                </FormControl>
              </>
            )}

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!values.name || !values.number || !values.address}
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
