import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
interface Props {
  classes: any;
  photos: File[];
}

class ImageSelector extends React.Component<Props> {

  state = {
    photos: [] || this.props.photos,
  };
  handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const img = event.currentTarget.files;
    this.setState({ photos: img });
    /*  const imgUrls = img.src;
    const files = event.target.files; */
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

      </div>
    );
  }
}
const styles = () =>
  createStyles({
    label: {
      backgroundColor: 'red',
    },
    input: {
      padding: '6px 16px',
      fontSize: '0.875rem',
      minWidth: 64,
      minHeight: 36,
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      lineHeight: 1.3125,
      fontFamily: 'Poppins',
      fontWeight: 500,
      borderRadius: '4px !important',
      textTransform: 'uppercase',
      backgroundColor: '#2096f3 !important',
      boxShadow:
        '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    },
  });

export default withStyles(styles)(ImageSelector);
