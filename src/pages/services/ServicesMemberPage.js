import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '18ch',
      },
  },
}));

export default function ServicesMemberPage() {
  const classes = useStyles();

  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

<div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexWrap="nowrap"
        p={1}
        m={1}
        bgcolor="background.paper"
       
      >
        <Box p={1} bgcolor="grey.150" width='40%'>
       


        
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Silver - ₹20000" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
           
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Gold - ₹35000" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
           
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Platinum - ₹50000" />
      </ListItem>
    </List>



        </Box>

        <Box p={1}   flexWrap="nowrap" color="primary" bgcolor="grey.150">
       
        
        <br></br>
        Company : <label> {localStorage.getItem('companyName')}</label>
        <br></br>
        <br></br>
       
       
        <form className={classes.root} noValidate autoComplete="off">
      <div>
       
        <TextField
          id="standard-textarea"
          label="Employee Strength"
          placeholder="number"
          multiline
        />
       
      </div>
    </form>

         
        </Box>

        </Box>
        <Box
        display="flex"
        flexWrap="nowrap"
        p={1}
        m={1}
        bgcolor="background.paper"
       
      >
        <Box p={1} bgcolor="grey.150" width='40%'>
        <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      Consultancy
    </Link>
        </Box>

</Box>
    </div>

  );
}
