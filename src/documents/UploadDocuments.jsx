import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
    IconButton,
    Tooltip,
  } from '@mui/material';
import UploadDocDialog from './UploadDocDialog';
import { useState,useEffect } from 'react';



function UploadDocuments({selectedStudent}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (
            <>
            <UploadDocDialog open = {open} handleOpen={handleOpen} handleClose={handleClose} contact = {selectedStudent.contact} student_id = {selectedStudent.student_id} />
            <Tooltip title="Upload Documents">
                <IconButton onClick={handleOpen}>
                <UploadFileIcon /> 
                </IconButton>
            </Tooltip>
        </>
    );
}

export default UploadDocuments;