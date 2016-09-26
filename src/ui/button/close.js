import styles from './button.css';
import closeCentral from '../../images/close-central.svg';

const CloseButton = function({
    label = 'Dismiss',
    className,
    onClick
}) {
    const classes = [styles.button, styles.tertiary];
    if (className) {
        classes.push(className);
    }

    return (
        <button className={classes.join(' ')}
            aria-label={label}
            data-link-name="close button"
            dangerouslySetInnerHTML={{__html: closeCentral}}
            onClick={onClick}
        />
    );
};

CloseButton.propTypes = {
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default CloseButton;
