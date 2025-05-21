import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const ListDoctor = () => {
    const { doctorData } = useContext(AdminContext);

    return (
        <div className="m-5 max-h-[90vh] ml-5">
            <h1 className="text-lg font-medium">Tất của bác sĩ</h1>
            <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
                {doctorData.map((item, index) => (
                    <div key={index} className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
                        <img className="bg-indigo-50 h-48 w-full group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
                        <div className="p-4">
                            <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                            <p className="text-zinc-600 text-sm">{item.speciality}</p>
                            <div className="mt-2 flex items-center gap-1 text-sm">
                                {/* <input className="accent-blue-500" onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} /> */}
                                <input className="accent-blue-500" type="checkbox" checked={item.available} />
                                <p>Khóa tài khoản</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListDoctor;
