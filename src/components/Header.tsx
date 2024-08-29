import logo from '../assets/karavan1.png';
import { Link } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";

const Header = () => {
    const links = [
        { label: 'home', url: '/' },
        { label: 'add post', url: '/addPost' },
        { label: 'login', url: '/login' },
    ];

    const menu = (
        <Menu className="w-48"> {/* Set the dropdown width here */}
            {links.map((link, index) => (
                <Menu.Item key={index} className="w-full"> {/* Ensure each item takes the full width */}
                    <Link to={link.url} className="capitalize text-[16px] block"> {/* Use block to ensure full width */}
                        {link.label}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <header className="p-4 dark:text-gray-700 ">
            <div className="container flex justify-between h-16 mx-auto items-center">
                <span className="flex items-center justify-center">
                    <img alt="Logo" className="w-[12rem] h-auto" src={logo} />
                </span>
                <ul className="items-stretch hidden space-x-3 md:flex">
                    {links.map((link, index) => (
                        <Link to={link.url} key={index}>
                            <li className="flex">
                                <h1 className="flex items-center px-4 -mb-1 uppercase hover:text-yellow-500">
                                    {link.label}
                                </h1>
                            </li>
                        </Link>
                    ))}
                </ul>
                <Dropdown  className="flex justify-end p-4 md:hidden " overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
