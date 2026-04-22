import { Controller } from "react-hook-form";

const InputForm = ({ name, control, placeholder, label, type = "text", error }) => {
	return (
		<div className="flex flex-col">
			
			<label htmlFor={name} className="text-sm font-medium mb-1 ">
				{label}
			</label>

			<Controller name={name} control={control} defaultValue={type === "file" ? null : ""}
				placeholder={placeholder}
				render={({ field }) => (
					<input id={name} type={type}
					{...field}
					placeholder={placeholder}
				
						onChange={(e) =>
							type === "file"
								? field.onChange(e.target.files)
								: field.onChange(e.target.value)
						}
						className={` w-full  px-3 py-2  border  rounded-lg  text-sm transition-all 
									outline-none mb-1
							${error 
								? "border-kanagawa-errorD focus:ring-2 focus:ring-kanagawa-pinkL" 
								: " focus:ring-2 focus:ring-kanagawa-primary focus:border-kanagawa-primaryL"
							}
						`}
					/>
				)}
			/>

				<p className="text-xs text-kanagawa-error h-2 ">
					{error?.message || ""}
				</p>

			
		</div>
	);
};

export default InputForm;