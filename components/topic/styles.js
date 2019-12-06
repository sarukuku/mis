import makeStyles from '@material-ui/core/styles/makeStyles'
import { createStyles } from '@material-ui/core'

export default makeStyles(theme =>
  createStyles({
    topic: {
      margin: theme.spacing(0, 1.3, 2, 1.3),
      boxShadow: '0px 0px 30px 10px rgba(0,0,0,0.05)',
      borderRadius: '15px',
      backgroundColor: 'f0f0f0'
    },
    topicHeader: {
      borderBottom: 'solid 1px black',
      padding: theme.spacing(2.5)
    },
    topicTitle: {
      fontWeight: 'bold'
    },
    topicContent: {
      height: '240px',
      overflow: 'auto'
    },
    note: {
      padding: theme.spacing(1.5, 1)
    },
    addNote: {
      width: '90vw',
      padding: theme.spacing(1, 1.2)
    }
  })
)
