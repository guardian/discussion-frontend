import styles from './faux-link.css';

const FauxLink = function({
    children,
    href,
    onClick
}) {
    return (
        <div className={styles.container}>
            {children}
            <a href={href} onClick={onClick} className={styles.link}></a>
        </div>
    );
};

FauxLink.propTypes = {
    children: React.PropTypes.any,
    href: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default FauxLink;
