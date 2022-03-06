import { Typography } from '@material-ui/core'
import { Card, CardContent } from '@mui/material'
import React from 'react'

export default function Win() {
  return (
    <>
        <Card elevation={1}>
            <CardContent>
                <Typography>
                    YOU WIN!
                </Typography>
            </CardContent>
        </Card>
    </>
  )
}
