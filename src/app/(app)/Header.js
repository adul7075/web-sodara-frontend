const Header = ({ title }) => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-3 px-2 sm:px-2 lg:px-2">

                <h2 className="font-semibold text-xl text-gray-800 leading-tight ml-12">
                    {title}
                </h2>
            </div>
        </header>
    )
}

export default Header