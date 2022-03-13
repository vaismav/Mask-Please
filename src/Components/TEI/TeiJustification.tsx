import React, { FC, ReactElement, } from 'react';
import HighlightedText from '../HighlightedText';

type Props ={
    value:string
}

const TeiJustification: FC<Props> = ({ value = ""}: Props): ReactElement => {
    return <HighlightedText value={value} color="red" tooltip='A justification'/>
}

export default TeiJustification;