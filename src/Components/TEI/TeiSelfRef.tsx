import React, { FC, ReactElement, } from 'react';
import HighlightedText from '../HighlightedText';

type Props ={
    value:string
}

const TeiSelfRef: FC<Props> = ({ value = ""}: Props): ReactElement => {
    return <HighlightedText value={value} color="orange" tooltip='A selfReference'/>
}

export default TeiSelfRef;