import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 300
  }
})

export default function MediaCard(props) {
  const classes = useStyles()

  const {product, url, description, price, name} = props
  console.log(props)
  //   return (
  //     <Card className={classes.root}>
  //       <CardActionArea>
  //         <CardMedia
  //           className={classes.media}
  //           image={url}
  //           title={name}
  //         />
  //         <CardContent>
  //           <Typography gutterBottom variant="h5" component="h2">
  //             {name}
  //           </Typography>
  //           <Typography variant="body2" color="textSecondary" component="p">
  //             {description}
  //           </Typography>
  //           <Typography variant="body2" color="textSecondary" component="p">
  //             {price}
  //           </Typography>
  //         </CardContent>
  //       </CardActionArea>
  //       <CardActions>
  //         <Button size="small" color="primary">
  //           Add To Cart
  //         </Button>
  //         <Link to={`/product/${product.id}`}> <Button size="small" color="primary">
  //           Learn More
  //         </Button></Link>
  //       </CardActions>
  //     </Card>
  //   );
  return (
    <Card className={classes.root} style={{margin: '20px'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/product/${product.id}`}>
          <Button style={{color: 'green'}} size="small" color="primary">
            Buy
          </Button>
          <Button style={{color: 'green'}} size="small" color="primary">
            Learn More
          </Button>{' '}
        </Link>
      </CardActions>
    </Card>
  )
}
