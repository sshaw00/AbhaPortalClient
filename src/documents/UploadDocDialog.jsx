import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Stepper, Step, Box, Typography, StepLabel, StepContent,
    Button, TextField, FormControl, List, ListItem, RadioGroup, FormControlLabel, Radio, IconButton,
} from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import crudData from '../config/apiService';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Tooltip,
} from '@mui/material';

export default function UploadDocDialog(props) {
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [radioSelection, setRadioSelection] = useState('aadhar');
    const [studentFile, setStudentFile] = useState({
        applicantFile: {},
        applicantFileName: ''
    })
    const [password, setPassword] = useState('')
    const {
        handleClose, contact, student_id, open
    } = props;

    // swarup bring this from document type master table
    // hard-coded for now for testing
    const documentProofType = [

        {
            type: "aadhar",
            description: "Adhar Card"
        },
        {
            type: "student_id",
            description: "Student Identity Card"
        },
        {
            type: "dob",
            description: "Date Of Birth Certificate"
        },
        {
            type: "ews",
            description: "EWS Certificate"
        },

    ]
    const docOptions = documentProofType.map((options) => (
        <FormControlLabel
            value={options.type}
            control={<Radio />}
            label={options.description}
        />
    ));

    const handleRadioSelection = (e) => {
        setRadioSelection(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleFileSelection = (e) => {
        if (e.target.value) {
            setStudentFile({
                applicantFile: e.target.files[0],
                applicantFileName: e.target.files[0].name,
            })
        }
        else {
            setStudentFile({
                applicantFile: {},
                applicantFileName: ''
            });
        }
    }

    const handleDeleteDoc = () => {
        setStudentFile({
            applicantFile: {},
            applicantFileName: ''
        });
    }

    const uploadToS3 = async (file, student_id) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('filename', `${contact}-student-${student_id}`);
            const response = await crudData('/student/docs/uploads3', 'PUT', formData, "authengine");
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }
    };

    const handleUpload = async () => {
        try {
            const res = await uploadToS3(studentFile.applicantFile, student_id);
            const s3link = res.item;
            const requestbody = {
                s3link,
                password,
                filetype: radioSelection,
                student_id,
            };
            const response = await crudData('/student/docs/uploaddb', 'PUT', requestbody, "authengine");
            const result = await response.json();
            console.log(result);
            setLoading(false);
            setActiveStep(0);
            handleClose();
        } catch (error) {
            console.error('Error handling upload:', error);
            setLoading(false);
            setActiveStep(0);
            handleClose();
        }
    };


    const steps = [
        {
            label: "What's the type of document you want to Upload?",
            description:
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="documents"
                        value={radioSelection}
                        name="radio-buttons-group"
                        style={{
                            flexWrap: 'nowrap',
                            height: '14em',
                            overflow: 'auto',
                        }}
                        onChange={handleRadioSelection}
                    >
                        {docOptions}
                    </RadioGroup>
                </FormControl>

        },
        {
            label: 'Click on the icon below to select files for upload',
            description:
                (studentFile.applicantFileName === '' ?
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '7em',
                    }}
                    >
                        <label htmlFor="icon-button-file">
                            <input
                                onChange={(e) => handleFileSelection(e)}
                                id="icon-button-file"
                                style={{ display: 'none' }}
                                type="file"
                                accept="application/pdf, image/*" 
                            />

                            <IconButton size="medium" style={{ color: 'seagreen' }} aria-label="upload file" component="span">
                                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <CloudUpload style={{ fontSize: 'xxx-large' }} />
                                    <span style={{ fontSize: '12px', margin: '1em', color: 'darkgrey' }}>Note: Please upload one file only.</span>
                                </span>
                            </IconButton>
                        </label>
                    </Box>
                    :
                    (
                        <Box style={{
                            height: '12em',
                            overflowX: 'scroll',
                        }}
                        >
                            <List>
                                <ListItem>
                                    <DescriptionIcon fontSize="small" style={{ color: 'grey' }} />
                                    <span style={{ fontSize: '12px', marginLeft: '1em', color: 'darkslategrey' }}>{studentFile.applicantFileName}</span>
                                    <Tooltip title="Delete">
                                        <IconButton color="error" onClick={handleDeleteDoc
                                        }>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            </List>
                        </Box>
                    ))
        },
        {
            label: 'Provide password if any',
            description:
                <TextField
                    id="outlined-basic"
                    label="Provide password"
                    size="small"
                    helperText="*Optional"
                    variant="outlined"
                    onChange={handlePassword}
                />,
        },
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setRadioSelection('aadhar');
        setPassword('');
        setStudentFile({
            applicantFile: {},
            applicantFileName: '',
        });
        handleClose();
        setActiveStep(0);
        setLoading(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Upload Document</DialogTitle>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            size="small"
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            style={{ marginTop: '1px', marginRight: '1px', display: index === 0 && 'none' }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                            disabled={index === 1 && studentFile.applicantFileName === ''}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {loading && (
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <CircularProgress size={20} />
                    </Box>
                )}
            </Box>
            <DialogActions>
                <Button
                    onClick={handleReset}
                    variant="outlined"
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button onClick={handleUpload} disabled={activeStep !== 3} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
