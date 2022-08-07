import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './addblog.css';


const labelStyles = {mb:1,mt:2,fontSize:'24px', fontWeight:'bold'}
const AddBlog = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title:"", description:"",imageURL:""
  })
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const sendRequest = async() => {
    const res = await axios.post("http://localhost:4000/api/blog/add", {
      title:inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      user: localStorage.getItem("userId")
    }).catch(err=> console.log(err))
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate("/blogs"));
  }

  return (
    <div className='addBlogDiv'>
      <form className='addBlogForm' onSubmit={handleSubmit}>
        <Box 
          bgcolor={'white'}
          color={'black'}
          border={3} 
          borderColor="linear-gradient(90deg, rgba(113,0,68,1) 5%, rgba(220,71,125,1) 53%, rgba(140,0,71,1) 98%, rgba(169,0,127,1) 100%)"
          borderRadius={10} 
          boxShadow="10px 10px 20px #ccc" 
          padding={3} 
          margin={"auto"} 
          marginTop={3}
          display="flex" 
          flexDirection={'column'}
          width={"80%"}
          // height={"100%"}
        >

          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>Post Your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant='outlined' />
          <InputLabel  sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant='outlined' />
          <InputLabel sx={labelStyles}>imageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined' />
          <Button sx={{mt:2, borderRadius:4}} variant="contained" color='warning' type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog

