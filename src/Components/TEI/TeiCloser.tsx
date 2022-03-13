import React, { FC, ReactElement, } from 'react';
import HighlightedText from '../HighlightedText';

type Props ={
    value:string
}

const TeiCloser: FC<Props> = ({ value = ""}: Props): ReactElement => {
    return <HighlightedText value={value} color="grey" tooltip='A closer'/>
}

export default TeiCloser;