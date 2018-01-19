import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import { Typography, Button } from 'material-ui'
import red from 'material-ui/colors/red'
import FavoriteIcon from 'material-ui-icons/Favorite'
import ShareIcon from 'material-ui-icons/Share'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { fetch, API } from 'api/'
import 'styles/post.scss'

const styles = theme => ({
  card: {
    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2) inset'
    // width: '100%',
    // paddingLeft: 10,
    // paddingRight: 10,
    // [theme.breakpoints.up('md')]: {
    //   width: 'auto',
    //   maxWidth: 300,
    //   padding: 0
    // }
  },
  cardContent: {
    paddingTop: 0
  },
  media: {
    height: 194
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  title: {
    fontSize: '1.1rem'
  },
  flexGrow: {
    flex: '1 1 auto'
  },
  content: {
    lineHeight: 1.6
  },
  readMore: {
    marginTop: 13
  }
})

class Post extends Component {
  constructor (...arg) {
    super(...arg)

    this.state = {
      expanded: false,
      meta: {
        categories: []
      }
    };

    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  componentDidMount () {
    const { categories = [] } = this.state.meta;
    if (this.props.post.id && !categories.length) {
      this.props.makeFetch(this.getCategories);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.post.id !== this.props.id) {
      this.props.makeFetch(this.getCategories);
    }
  }

  get postRoute () {
    return `/posts/${this.props.post.id}/`
  }

  render () {
    const { classes, post } = this.props
    const { categories } = this.state.meta

    return (
      <div className={'post-wrap'} ref={el => { this.wrapEl = el; }}>
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={<Link className={classes.title} to={this.postRoute}>{post.title}</Link>}
            subheader={this.renderCategories(post.date, categories)}
          />
          {/* <CardMedia
            className={classes.media}
            image='/static/images/cards/paella.jpg'
            title='Contemplative Reptile'
          /> */}
          <CardContent className={classes.cardContent}>
            <Typography component='p' className={`${classes.content} base-text`}
              dangerouslySetInnerHTML={{__html: post.excerpt}} />
            <Button raised type='accent' className={classes.readMore}>
              <Link to={this.postRoute}>ReadMore</Link>
            </Button>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label='Add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='Share'>
              <ShareIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <IconButton
              className={[classes.expand, {
                [classes.expandOpen]: this.state.expanded
              }]}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label='Show more'
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
            <CardContent className={'article'} />
          </Collapse>
        </Card>
      </div>
    )
  }

  renderCategories (date = null, categories = []) {
    return <p className={'categories-wrap'}>{ date }<span className={'category-label'}>分类于</span>
      {categories.map((item, index) => {
        return <span key={item.id}>{item.name}{ index !== categories.length - 1 && ', '}</span>;
      })}
    </p>;
  }

  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded })
  }

  getCategories = () => {
    const { post } = this.props;
    if (post.categories && post.categories.length) {
      return fetch({
        ...API.getCategories,
        data: {
          include: post.categories.join(',')
        }
      }).then(res => {
        if (res && res.data && this.wrapEl) {
          this.setState(prevState => ({
            meta: Object.assign({}, prevState.meta, {
              categories: res.data
            })
          }));
        }
      });
    }
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
}

Post.defaultProps = {
  makeFetch: (func) => func()
}

export default withStyles(styles)(Post)
