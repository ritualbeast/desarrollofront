/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import ModalSpiner from '../util/ModalSpiner'

export default function NewModal (props) {
  const [spiner, setSpiner] = useState(false)
  const handleClose = () => {
    window.scrollTo(0, 600)
    setSpiner(false)
  }

  return (
      <>
      <ModalSpiner opt={spiner} />
         <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle className={props.color} id="alert-dialog-title">{props.header} <div className='close-x' onClick={props.hclose}>{props.close}</div></DialogTitle>
            <DialogContent>
            <DialogContentText id="modal-center">
                {props.body}
            </DialogContentText>
            </DialogContent>
            <a className='link-modal' onClick={props.hlink}>{props.link}</a>
            <DialogActions>
            <Button id="btn-close" onClick={props.handle} autoFocus>
              {props.button}
            </Button>
            </DialogActions>
        </Dialog>
      </>
  )
}
