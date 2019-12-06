import makeStyles from '@material-ui/core/styles/makeStyles'
import {createStyles} from '@material-ui/core'

export default makeStyles(theme =>
    createStyles({
        topic: {
            margin: theme.spacing(3, 2)
        },
        topicContent: {
            height: '240px',
            overflow: 'auto',
        },
        noteList: {
            boxShadow: "0 1px 6px #00000047",
        },
        note: {
            padding: theme.spacing(3, 2)
        }
    })
)
