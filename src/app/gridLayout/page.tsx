import React from 'react';
import { Box } from "@mui/material"
import Grid from "./components/grid"
import "../../style/grid.scss"

const GridLayout = () => {



    return (
        <Box

            className='w-full h-full'

            sx={{
                border: '1px solid red'
            }}
        >


            <Grid></Grid>
        </Box>
    )
}


export default GridLayout