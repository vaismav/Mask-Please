import React, { FC, ReactElement, } from 'react';
import { makeStyles, Theme  } from '@mui/material';
import HighlightedText from '../HighlightedText';

type Props ={
    value:string
}

const TeiJustification: FC<Props> = ({ value = ""}: Props): ReactElement => {
    return <HighlightedText value={value} color="red" tooltip='A justification'/>
}

export default TeiJustification;