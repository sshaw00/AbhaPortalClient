import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    IconButton,
    Tooltip,
  } from '@mui/material';


function ViewDocuments({selectedStudent}) {

    return (
        <>
            <Tooltip title="View Documents">
                <IconButton onClick={() => console.log(selectedStudent)}>
                    <VisibilityIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}

export default ViewDocuments;