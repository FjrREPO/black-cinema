export const Loader = () => {
    return (
        <div style={styles.container}>
            <img src="https://res.cloudinary.com/dutlw7bko/image/upload/v1717262615/Cinema/load_tph6wf.gif" alt="Loading" style={styles.image} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
    },
    image: {
        width: '500px',
        height: 'auto',
    },
};