import React, { Component } from 'react'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import MobileStepper from 'material-ui/MobileStepper'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

const styles = (theme) => ({
  paginationWrap: {
    position: 'relative',
    left: 0,
    top: 0
  },
  paginationInfo: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: '50%',
    height: '100%',
    width: 200,
    transform: 'translateX(-50%)',
    color: theme.palette.common.lightBlack
  }
})

class Pagination extends Component {
  constructor (...arg) {
    super(...arg)
  }

  get paginationInfo () {
    const { page, pageSize, total } = this.props

    if (total === 0) {
      return `${total}`
    }
    return `${(page - 1) * pageSize + 1}-${page * pageSize} of ${total}`
  }

  render () {
    const { classes, theme, page, totalPages,
      startPage, handlePageBack, handlePageNext } = this.props
    return (
      <div className={classes.paginationWrap}>
        <MobileStepper
          type='text'
          steps={totalPages}
          position='static'
          activeStep={page}
          nextButton={<Button dense onClick={handlePageNext} disabled={page === totalPages}>
            Next
                              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>}
          backButton={<Button dense onClick={handlePageBack} disabled={page === startPage}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} Back
                            </Button>} />
        <div className={classes.paginationInfo}>
          {this.paginationInfo}
        </div>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Pagination)
