export function Input({placeholder,ref,type}:{placeholder:string,ref?: any,type?:any}) {
  return <div>
    <input ref={ref} placeholder={placeholder} type={type} className="px-4 py-2 border rounded-sm m-2">
    </input>
  </div>
}