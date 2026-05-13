import { Controller } from "react-hook-form";

const InputForm = ({ name, control, placeholder, label, type = "text", error }) => {
  return (
    <div className="flex flex-col mb-1">
      <label htmlFor={name} className="text-sm font-medium mb-1">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={type === "file" ? undefined : ""}
        render={({ field }) => {

          // 🔥 CASO FILE (SIN {...field})
          if (type === "file") {
            return (
              <input
                id={name}
                type="file"
                onChange={(e) => field.onChange(e.target.files)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            );
          }

          // 🔥 CASO NORMAL
          return (
            <input
              id={name}
              type={type}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                error
                  ? "  focus:ring-2 focus:ring-kanagawa-pinkL"
                  : "focus:ring-2 focus:ring-kanagawa-primary"
              }`}
            />
          );
        }}
      />

      <p className="text-xs text-kanagawa-error ml-2 p-1 h-2">
        {error?.message || ""}
      </p>
    </div>
  );
};

export default InputForm;