import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function FormControls({ formControls = [], formData = {}, setFormData }) {
  const renderComponentByType = (controlItem) => {
    if (!controlItem || !controlItem.name) {
      console.error("Invalid control item:", controlItem);
      return null;
    }

    const currentValue = formData?.[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type || "text"}
            value={currentValue}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: event.target.value,
              }))
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: value,
              }))
            }
            value={currentValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            value={currentValue}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: event.target.value,
              }))
            }
          />
        );

      default:
        console.warn(`Unknown component type: ${controlItem.componentType}`);
        return (
          <Input
            id={controlItem.name}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type || "text"}
            value={currentValue}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: event.target.value,
              }))
            }
          />
        );
    }
  };

  if (!formControls || formControls.length === 0) {
    return <p>No controls available</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
