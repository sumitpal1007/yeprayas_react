import React from 'react';
import Box from '@material-ui/core/Box';
import ServicesSafeCheckBoxes from "./ServicesSafeCheckBoxes.js";
import Location from "./Location.js";
import ServicesSafeQuantity from './ServicesSafeQuantity';
import ServicesSafePrice from './ServicesSafePrice';
import ServicesSafeSubmit from './ServicesSafeSubmit';

export default function SafePage() {
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
        <ServicesSafeCheckBoxes detail={{id:1,name:'Drilling'}} />
               <ServicesSafeCheckBoxes detail={{id:2,name:'Degassing'}} />
               <ServicesSafeCheckBoxes detail={{id:3,name:'Wiping'}} />
               <ServicesSafeCheckBoxes detail={{id:4,name:'Destruction'}} />
        </Box>

        <Box p={1} bgcolor="grey.150">
        <Location/>
        <br></br>
        <ServicesSafeQuantity/>
        </Box>
        
      </Box>
      <Box
        display="flex"
        flexWrap="nowrap"
        p={1}
        m={1}
        bgcolor="background.paper"
       
      >
          <Box p={1} width='40%' bgcolor="grey.150">
       
       <ServicesSafeSubmit/>
        
       </Box>
        <Box p={1}  color="primary" fontSize='17px' bgcolor="grey.150">
        <br></br>
        Price : 
         
        </Box>

        <Box p={1} bgcolor="grey.150">
        <ServicesSafePrice/>
         
        </Box>

       
      </Box>
    </div>
  );
}
