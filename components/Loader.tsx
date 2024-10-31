import React from "react";

interface Props {
    isLoading: boolean;
    children: React.ReactNode;
}

export const Loader = ({ isLoading, children }: Props) => {
    if (!isLoading) return <>{children}</>;
    return (
        <div style={styles.container}>
            <Image width={100} height={100} src="https://res.cloudinary.com/dutlw7bko/image/upload/v1717329323/Cinema/Logo/Loading_glnsrw.gif" alt="Loading" style={styles.image} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'transparent',
    },
    image: {
        width: '500px',
        height: 'auto',
    },
};
