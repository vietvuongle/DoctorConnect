import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { ClinicContext } from "../context/ClinicContext";

const Navbar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);
    const { cToken } = useContext(ClinicContext);

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img className="w-36 sm:w-40 cursor-pointer" src={assets.logo5} alt="" />
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
                    {aToken && "Admin"}
                    {dToken && "Doctor"}
                    {cToken && "Clinic"}
                </p>
            </div>
        </div>
    );
};

export default Navbar;
