import { useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ViewDocuments from "../../documents/ViewDocuments";
import UploadDocuments from "../../documents/UploadDocuments";
import crudData from "../../config/apiService";
import axios from "axios";

const columnHelper = createMRTColumnHelper();
const columns = [
  columnHelper.accessor("student_id", {
    header: "Student ID",
    size: 60,
  }),
  columnHelper.accessor("centre_name", {
    header: "Centre Name",
    size: 60,
  }),
  columnHelper.accessor("batch_name", {
    header: "Batch Name",
    size: 60,
  }),
  columnHelper.accessor("name", {
    header: "Full Name",
    size: 120,
  }),
  columnHelper.accessor("contact", {
    header: "Phone Number",
    size: 60,
  }),
  columnHelper.accessor("address", {
    header: "Address",
    size: 300,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const StudentTables = ({ students, setStudents, centerId, batchId }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isPerformingAction, setIsPerformingAction] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    succes: false,
    response: "",
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(students);
    download(csvConfig)(csv);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "student_id",
        header: "Student ID",
        enableEditing: false,
        size: 40,
      },
      {
        accessorKey: "centre_name",
        header: "Centre Name",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "batch_name",
        header: "Batch Name",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Full Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
        },
      },
      {
        accessorKey: "contact",
        header: "Phone Number",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: "address",
        header: "Address",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  // CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createStudent(values);
    table.setCreatingRow(null);
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    console.log(values);
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateStudent(values);
    table.setEditingRow(null);
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log(row.original);
      deleteStudent(row.original.student_id, row.original.batch_id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: students,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    getRowId: (row) => row.id,
    positionActionsColumn: "last",
    muiToolbarAlertBannerProps: false
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ViewDocuments selectedStudent={row.original} />
        <UploadDocuments selectedStudent={row.original} />
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        {/* <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Create New User
        </Button> */}

        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
    state: {
      isLoading: false,
      isSaving: false,
      showAlertBanner: false,
      showProgressBars: false,
    },
  });

  return <MaterialReactTable table={table} />;
};

// swarup
async function createStudent(values) {
  //set is performing state true
  //call crud data
  //if successfull update the set students state by the api call bring the centerid and batch id through props and call the api
  //make a snackbar with the apis response
}

// swarup
async function updateStudent(values) {
  //set is performing state true
  //call crud data
  //if successfull update the set students state
  //use below logic
  // setStudents(['students'], (prevUsers) =>
  //         prevUsers?.filter((user) => user.id !== userId),
  //       );
  //make a snackbar with the apis response
  console.log(values);
  try {
    const data = await crudData(
      "/update-student",
      "POST",
      {
        name: values.name,
        contact: values.contact,
        address: values.address,
        student_id: values.student_id,
      },
      "studentEngine"
    );
    // setStudents(data.message.users);

    // console.log(data.message);
    // Filter the batches based on the selected centre
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}

// swarup
async function deleteStudent(studentID, batchID) {
  // event.preventDefault();
  console.log(studentID, batchID);
  try {
    const data = await crudData(
      "/delete-student",
      "POST",
      { studentID: studentID, batchID: batchID },
      "studentEngine"
    );
    <StudentTables students={data.message.users} />;

    // console.log(data.message);
    // Filter the batches based on the selected centre
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}

export default StudentTables;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  console.log(user.name);
  return {
    name: !validateRequired(user.name) ? "Full Name is Required" : "",
    // email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
