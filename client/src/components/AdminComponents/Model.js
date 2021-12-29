import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TableRow from "@mui/material/TableRow";
import Button from "../Button";
import TableCell from "@mui/material/TableCell";

function Flight({ _id,name, economyRows, economyColumns, businessRows, businessColumns, firstClassRows, firstClassColumns, deleteModel}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  // return (
  //   <>
  //   <tr>
  //     <td> {name}</td>
  //     <td > {economyRows}</td>
  //     <td  >{economyColumns}</td>
  //     <td >{businessRows}</td>
  //     <td >{businessColumns}</td>
  //     <td >{firstClassRows}</td>
  //     <td >{firstClassColumns}</td>
  //   <td>
  //     <button  onClick = {handleClickOpen} >
  //       Delete
  //     </button >
  //     <Dialog
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby="alert-dialog-title"
  //         aria-describedby="alert-dialog-description"
  //       >
  //         <DialogTitle id="alert-dialog-title">
  //           {"Are you sure you want to delete this Model ?"}
  //         </DialogTitle>
  //         <DialogContent>
  //           <DialogContentText id="alert-dialog-description">
  //             Once delete is clicked this model will be no longer available along side with all flights of that model !
  //           </DialogContentText>
  //         </DialogContent>
  //         <DialogActions>
  //           <button onClick={handleClose}>Cancel</button>
  //           <button onClick={()=>deleteModel(_id)} autoFocus>
  //             Delete
  //           </button>
  //         </DialogActions>
  //       </Dialog>
  //     </td>
  //   </tr>
  //   </>

  // )

  return (
    <>
    <TableRow>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">
        {economyRows}
      </TableCell>
      <TableCell align="center">
        {economyColumns}
      </TableCell>
      <TableCell align="center">
        {" "}
        {businessRows}
      </TableCell>
      <TableCell align="center">
        {" "}
        {businessColumns}
      </TableCell>
      <TableCell align="center">
        {" "}
        {firstClassRows}
      </TableCell>
      <TableCell align="center">
        {" "}
        {firstClassColumns}
      </TableCell>
      <TableCell align="center">
        {" "}
        <Button 
        index={1}
        width={80}
        label="Delete"
        onClick={handleClickOpen}>
        </Button>
      </TableCell>
    </TableRow>
    
         <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this Model ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once delete is clicked this model will be no longer available along side with all flights of that model !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={()=>{deleteModel(_id);setOpen(false);}} autoFocus>
              Delete
            </button>
          </DialogActions>
        </Dialog>
  </>
  )
}

export default Flight
