import { SidebarItem } from "./SidebarItem" 
import { NewFolder } from "../icons/NewFolder"
import { Folder } from "../icons/Folder"
import { OrbitIcon } from "../icons/OrbitIcon"

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 absolute fixed left-0 top-0 pl-6 pt-4 ">
        <div className="flex text-2xl items-center font-bold text-[#efb100] pt-2">
            <div className="pr-1">
                <OrbitIcon/>
            </div>
            Orbit
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem icon={<NewFolder/>} text="New Folder"/>
            <SidebarItem icon={<Folder/>} text="DSA"/>
        </div>
    </div> 
}