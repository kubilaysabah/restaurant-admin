import { BsBox } from "react-icons/bs";
import { VscLayers } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { MenuProps } from "types";

const Menu: MenuProps[] = [
    {
        id: 1,
        title: "Orders",
        icon: <BsBox size={25} />,
        children: [
            {
                title: "New Order",
                url: "/create",
                count: 0,
            },
            {
                title: "Accepted",
                url: "/",
                count: 3,
            },
            {
                title: "Cooking",
                count: 3,
            },
            {
                title: "Parcel Ready",
                count: 3,
            },
            {
                title: "Delivered",
                count: 3,
            },
            {
                title: "Completed",
                count: 3,
            }
        ]
    },
    {
        id: 2,
        title: "Layers",
        icon: <VscLayers size={25} />,
    },
    {
        id: 3,
        title: "Settings",
        icon: <FiSettings size={25} />,
    }
];

export default Menu;