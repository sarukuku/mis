import makeStyles from '@material-ui/core/styles/makeStyles'
import { createStyles } from '@material-ui/core'

export default makeStyles(theme =>
  createStyles({
    deleteButton: {
      padding: theme.spacing(1),
      fontSize: '1.2rem'
    }
  })
)
