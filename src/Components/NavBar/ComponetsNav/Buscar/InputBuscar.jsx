export const InputBuscar = ({ text, icon: Icon, buscar, value }) => {
  return (
    <div className="relative w-full"> 
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      )}
      <input
        value={value}
        onChange={buscar}
        type="text"
        placeholder={text}
        className="w-full py-1.5 pl-10 pr-4 border rounded text-sm outline-none"
      />
    </div>
  )
}