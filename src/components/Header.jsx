import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
export default function Header(){ 

    return (
        <>
            <div className="flex justify-between px-4 md:px-8 py-6 items-center shadow-md bg-white">
                <Link to="/crud-data-app"><p className="text-lg md:text-xl text-black font-[600] cursor-pointer">Post Management App</p></Link>
                <div className="flex">
                    <Avatar size="small" icon={<UserOutlined/>} />
                    <p className="ml-4 hidden md:block text-gray-500">Admin</p>
                </div>
            </div>
        </>
    )
}