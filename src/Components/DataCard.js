//taken from Material UI Documentation
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TeiTextElement from './TEI/TeiText';
import {GetTeiDoc} from './TEI/TeiHeader';
import { getImageRef } from '../CloudAPI';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Xml = entryDoc =>{
  const text = GetTeiDoc(entryDoc);
  const copy = () => navigator.clipboard.writeText(text).then(() => alert("Copied the TEI to the clipboard"));
  return <>
    <button onClick={copy} >Copy to clipboard</button>
    <pre style={{textAlign:'left'}}>{text}</pre>
  </>
}

export default function DataCard({entryDoc}) {
  const [expanded, setExpanded] = React.useState(false);
  const [viewXML, setViewXML] = React.useState(false);
  const [imageRef,setImageRef] = React.useState('');

  const cardMaxWidth = 400;

  React.useEffect(()=>
    getImageRef(entryDoc.identifier).then(url => setImageRef(url))
  )

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if(!entryDoc){
    return <></>;
  }

  return (
    <Card sx={{ maxWidth: cardMaxWidth }}>
      <CardHeader

        title={entryDoc.title}
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
      /> */}
      <img src={imageRef}
        style={{ width:'100%', height:'195px' }}/>
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        { expanded &&
          <>
          <button onClick={() => setViewXML(!viewXML)}>{viewXML ? "Display Text" : "Display XML"}</button>
          </>
        }
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{position:'absolute', width:`${cardMaxWidth}px`, backgroundColor:'white', overflow:'scroll'}}>
        <CardContent>
          {   viewXML ?
            Xml(entryDoc)
            :
            <TeiTextElement entryData={entryDoc}/>
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}
