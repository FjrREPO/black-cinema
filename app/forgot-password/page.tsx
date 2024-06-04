import ForgotPassword from "./_components/forgotPassword";

export default async function Page() {
    return (
        <div
            className='min-w-screen min-h-screen bg-gray-700'
            style={{
                backgroundImage: 'url(https://cineverse.id/wp-content/uploads/2023/12/kungfu-panda.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <ForgotPassword user={undefined}/>
        </div>
    )
}
