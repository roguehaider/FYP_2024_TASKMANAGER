import React from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
import TextBox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import Loader from "./Loader";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Password Doesn't Match!");
      return;
    }
    try {
      await changeUserPassword(data).unwrap();
      toast.success("Password Changed Successfully!");
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <TextBox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <TextBox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm New Password is required!",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>
          {isLoading ? (
            <div className="py-5">
              <Loader />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm-flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-900 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm-w-auto"
                label="Save"
              />

              <button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm-w-auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
