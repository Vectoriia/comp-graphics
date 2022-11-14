import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Допомога
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.text}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Для перегляду детальнішої інформації про цю тему - можеш скористатись нашим
            <Link href="http://localhost:3000/info" underline="hover" style = {{padding: '5px'}}>
                Довідником
            </Link>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}