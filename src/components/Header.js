import React, { useState } from 'react'
import {AppBar, Box, Button,Tab, Tabs, Toolbar, Typography} from "@mui/material"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import "./header.css"

const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <AppBar
     position='fixed'
    sx={{
      background:
      "black"
    }}
    className='typoclass'
    >
      <Toolbar>
        <Typography variant='h4' color='white'>Blog Today</Typography>
      { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto">
          <Tabs textColor='inherit' value={value} onChange={(e, val)=>setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>
          </Tabs>
        </Box> }
        <Box display="flex" marginLeft="auto">
          { !isLoggedIn && <>
            <Button 
            LinkComponent={Link} to="/auth" 
            variant='contained' 
            sx={{margin:1, borderRadius:10}} 
          >
            Login
          </Button>
          <Button
            LinkComponent={Link} to="/auth"  
            variant='contained' 
            sx={{margin:1, borderRadius:10}} 
          > 
            Signup
          </Button></>}
          { isLoggedIn && (
            <Button 
              onClick={() => dispath(authActions.logout())}
              LinkComponent={Link} to="/auth" 
              variant='contained' 
              sx={{margin:1, borderRadius:10}} 
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header

