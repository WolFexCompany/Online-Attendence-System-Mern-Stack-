import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import '../../UserPanel/Pages/AllCss.css'
import AdminPanelHeader from "../Components/Header";
import AdminPanelSidebar from "../Components/SideBar";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function UserAttendenceRecord() {
    const [FetchUsersMarkAttendenceRecord, UpdateUsersMarkAttendenceRecord] = useState([])
    const [open, updateopen] = useState(false)
    const [showtext,updatetext]=useState('')
    const [ShowAttendencemessge,updateshowattendencemessage]=useState(false)
    const handleClose = () => {
        updateopen(false)
        UpdateEditState({
            ID: '',
            ApprovedAndNotApproved: ""
        })
    }
    const [EditState, UpdateEditState] = useState({
        ID: '',
        ApprovedAndNotApproved: ""
    })
    const dataadmin = useSelector((state) => state.AdminProtect.AdminProtectRouting)
    const token = `Bearer ${dataadmin.SecretKey}`
    useEffect(() => {
        const FetchRegisterUsersRecord = async () => {
            const Fetch = await fetch('http://localhost:8000/Admin/Fetch/User/Mark/Attendence/Record',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
            const ActualFetch = await Fetch.json()
            UpdateUsersMarkAttendenceRecord([...ActualFetch.Fetch])
        }
        FetchRegisterUsersRecord()
    }, [token])
    const EditUsersAttendence = (ID) => {
        updateopen(true)
        UpdateEditState({ ...EditState, ID: ID })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2
    };
    const Updateusersattendence = async (e) => {
        e.preventDefault()
        try {
            const EditAttendence = await fetch('http://localhost:8000/Admin/Edit/Users/Attendence/Admin',
            {
                method: "PUT",
                body: JSON.stringify({ EditState: EditState }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        )
        const ActualRes = await EditAttendence.json()
        UpdateUsersMarkAttendenceRecord([...ActualRes.Fetch])
        updateopen(false)
        UpdateEditState({
            ID: '',
            ApprovedAndNotApproved: ""
        })
        updatetext(ActualRes.message)
        updateshowattendencemessage(true)
        setTimeout(()=>
        {
            updateshowattendencemessage(false)
        },2000)

        } catch (error) {
            console.log(error)
        }
     
    }
    const DeleteUsersAttendence=async(ID)=>
    {
        try {
            const DeleteAttendence = await fetch(`http://localhost:8000/Admin/Delete/Users/Attendence/Admin/${ID}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        )
        const ActualRes = await DeleteAttendence.json()
        UpdateUsersMarkAttendenceRecord([...ActualRes.Fetch])
        updatetext(ActualRes.message)
        updateshowattendencemessage(true)
        setTimeout(()=>
        {
            updateshowattendencemessage(false)
        },2000)

        } catch (error) {
            console.log(error)
        }
    }

    return <>
      {
        ShowAttendencemessge && <>
           <Box p={2} position={"absolute"} top={"0"} zIndex={10000} left={"50%"} sx={{backgroundColor:"white",color:"black",transform:"translate(-50%,50%)"}}>{showtext}</Box>
        </>
    }
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h1" display={"flex"} justifyContent={"center"} sx={{ fontFamily: "Poppins" }}>
                    Edit Users Attendence
                </Typography>
                <Box component={"form"} id="Edituserform" paddingY={1} onSubmit={Updateusersattendence}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: "Poppins" }}>Attendence</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="ApprovedAndNotApproved"
                            value={EditState.ApprovedAndNotApproved}
                            label="Attendence"
                            required
                            onChange={(e) => UpdateEditState({ ...EditState, [e.target.name]: e.target.value })}
                        >
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Not Approved"}>Not Approved</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" sx={{ alignSelf: "flex-end" }} type="submit" form={"Edituserform"}>Update Attendence</Button>
            </Box>
        </Modal>
        <Box component={"div"} className="maindiv">
            <Box position={"sticky"} height={"100vh"} top={"0px"} paddingY={3} sx={{ background: '#2E3B55', color: "white" }}>
                <AdminPanelSidebar />
            </Box>
            <Box flex={1} flexDirection={"column"}  >
                <AdminPanelHeader />
                <Box display={"flex"} flexDirection={"column"} gap={2} p={3}>
                    <Typography display={"flex"} justifyContent={"center"} variant="h5" sx={{ fontFamily: "Poppins" }}>Users Attendence Records </Typography>
                    <Box >
                        <TableContainer >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Name</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Phone Number</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Cnic No</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Mark Attendence</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Date</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>Action</TableCell>




                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {FetchUsersMarkAttendenceRecord.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.Name}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.PhoneNumber}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.CnicNo}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.MarkAttendence}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>{row.Date}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins", textAlign: "center" }}>
                                                <Button startIcon={<EditIcon />} onClick={() => EditUsersAttendence(row._id)}></Button>
                                                <Button startIcon={<DeleteIcon />} onClick={() => DeleteUsersAttendence(row._id)}></Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
}