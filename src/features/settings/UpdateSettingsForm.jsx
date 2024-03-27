import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxNumberOfGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    console.log(value, field);
    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          type="number"
          disabled={isUpdating}
          id="min-nights"
          defaultValue={minBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          type="number"
          disabled={isUpdating}
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "maxNumberOfGuestsPerBooking")}
          type="number"
          disabled={isUpdating}
          id="max-guests"
          defaultValue={maxNumberOfGuestsPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
