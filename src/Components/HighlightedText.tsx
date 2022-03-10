import React, { FC, ReactElement, } from 'react';
import { Tooltip  } from '@mui/material';

type Props ={
    value: string,
    color?: string,
    tooltip?: string,
}

const HighlightedText: FC<Props> = ({ value , color = "black", tooltip}: Props): ReactElement => {
    return tooltip ? 
        <Tooltip title={tooltip}>
            <u style={{textDecorationColor: color}}  > {value}</u>
        </Tooltip>
        :
        <u style={{textDecorationColor: color}}  > {value}</u>;
}

export default HighlightedText;