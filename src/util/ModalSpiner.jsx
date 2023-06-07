import React from 'react'
import { DialogTitle, Dialog, DialogContent, DialogContentText } from '@material-ui/core'

const ModalSpiner = (props) => {
  return (
        // eslint-disable-next-line react/prop-types
        <Dialog open={props.opt} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="text-center mt-4 mb-4">
                <div className="loader mt-2"></div>
                </DialogContentText>
            </DialogContent>
            <DialogTitle className='notify-color mt-2' id="alert-dialog-title text-center "><b>Cargando... </b></DialogTitle>
        </Dialog>
  )
}

export default ModalSpiner
