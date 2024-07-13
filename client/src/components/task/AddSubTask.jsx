import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import SelectList from "../SelectList";
import { useState } from "react";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LISTS = ["TODO", "INPROGRESS", "COMPLETED"];
  const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
  const TYPES = ["STORY", "EPIC", "BUG"];

  const [stage, setStage] = useState(LISTS[0]);
  const [type, setType] = useState(TYPES[0]);
  const [priority, setPriority] = useState(PRIORIRY[2]);

  const [addSubTask] = useCreateSubTaskMutation();

  const handleOnSubmit = async (formData) => {
    try {
      const { title, date } = formData;

      const newSubTask = {
        title,
        date,
        type: type.toLowerCase(), 
        stage: stage.toLowerCase(), 
        priority: priority.toLowerCase(), 
      };

      const res = await addSubTask({ data: newSubTask, id }).unwrap();

      toast.success(res.message);
      setOpen(false);
      window.location.reload()
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message || err.message || "Failed to add Task."
      );
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="py-10">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          ADD NEW TASK
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <div className="flex gap-4">
            <SelectList
              label="Priority Level"
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
          </div>

          <div className="flex items-center gap-4">
            <SelectList
              label="Task Type"
              lists={TYPES}
              selected={type}
              setSelected={setType}
            />
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", {
                required: "Date is required!",
              })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>
        </div>
        <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
          <Button
            type="submit"
            className="bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
            label="Add Task"
          />

          <Button
            type="button"
            className="bg-white border text-sm font-semibold text-gray-900 sm:w-auto"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;
