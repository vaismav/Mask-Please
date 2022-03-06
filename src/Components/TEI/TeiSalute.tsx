import React, { FC, ReactElement, } from 'react';
import { makeStyles  } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        textTransform: 'none',
        boxShadow: 'none',
    },
}));

type Props ={
    value:string
}

const TeiSalute: FC<Props> = ({ value = ""}: Props): ReactElement => {
    const classes = useStyles();
    return <p className={classes.root}>{value}</p>;
}