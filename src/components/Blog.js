import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,Icon } from '@mui/material'
import {teal,pink,blue} from '@mui/material/colors'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './blogs.css'


const Blog = ({title, description, imageURL, userName, isUser, id}) => {
  
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:4000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  console.log(title, isUser)
  return (
    <div className='blogsDiv'>
      {" "}
      <Card sx={{ 
        width: "40%", 
        margin:'auto', 
        mt:8,
        // mb:, 
        padding:2, 
        boxShadow: "5px 5px 10px #ccc" , 
        // bgcolor: blue[100],
        ":hover":{
          boxShadow: "10px 10px 20px #ccc"
    },}}>
     {isUser && (
      <Box display='flex'>
        <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
          <EditIcon color='warning'/>
        </IconButton>
        <IconButton onClick={handleDelete}>
          <BackspaceIcon color='danger'/>
        </IconButton>

      </Box>
     )} 
    <CardHeader
      avatar={
      <Avatar
      sx={{ bgcolor: "red" }}
      aria-label="recipe"
      >
      </Avatar>}
      title={title}
      subheader="August 4, 2022"
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="Paella dish"
    />
    <CardContent>
    <hr/>
    <br/>
      
      <Typography variant="body2" color="text.secondary">
      
        <b>{userName}</b>
        <Icon>
          <VerifiedIcon sx={{width: '12px', mt:'7px', color:"black"}}/>
      </Icon>
        {" : "}
        {description}
      </Typography>
      
    </CardContent>
</Card></div>
  )
}

export default Blog

