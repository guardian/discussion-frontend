import styles from './faux-link.css';

const FauxLink = function({
    children,
    href
}) {
    return (
        <div className={styles.container}>
            {children}
            <a href={href} className={styles.link}></a>
        </div>
    );
};

FauxLink.propTypes = {
    children: React.PropTypes.any,
    href: React.PropTypes.string
};

export default FauxLink;
