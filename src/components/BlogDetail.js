import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const labelStyles = {mb:1,mt:2,fontSize:'24px', fontWeight:'bold'}

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id)
  const [inputs, setInputs] = useState({
  
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:4000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then((data)=> console.log(data))
      .then(()=> navigate("/myBlogs/"))
  }

  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
    <Box 
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
    >
      <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>Post Your Blog</Typography>
      <InputLabel sx={labelStyles}>Title</InputLabel>
      <TextField  name="title" onChange={handleChange} value={inputs.title} margin='normal' variant='outlined' />
      <InputLabel sx={labelStyles}>Description</InputLabel>
      <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant='outlined' />
      <Button sx={{mt:2, borderRadius:4}} variant="contained" color='warning' type="submit">Update</Button>
    </Box>
  </form>
  }</div>
  )
}

export default BlogDetail