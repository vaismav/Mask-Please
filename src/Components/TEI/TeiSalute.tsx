import React, { FC, ReactElement, } from 'react';
import HighlightedText from '../HighlightedText';

type Props ={
    value:string
}

const TeiSalute: FC<Props> = ({ value = ""}: Props): ReactElement => {
    return <HighlightedText value={value} color="blue" tooltip='A salute'/>
}

export default TeiSalute;