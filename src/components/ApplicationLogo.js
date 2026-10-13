
import Image from "next/image";

const ApplicationLogo = (props) => {
    return (
        <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={120}
            {...props}
        />
    );
};

export default ApplicationLogo;
