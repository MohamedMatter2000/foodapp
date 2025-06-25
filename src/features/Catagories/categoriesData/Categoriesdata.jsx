/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getValidationRules } from "../../../hooks/usevalidations";
import {
  useAddCategories,
  useUpdateCategory,
} from "../../../services/apiCategory";
import Modal from "react-bootstrap/Modal";
import ButtonFormInput from "../../../shared/FormInput/ButtonFormInput";
import FormInput from "../../../shared/FormInput/FormInput";
export default function CategoriesData({ closeModal, currentCategory, show }) {
  const isEditMode = Boolean(currentCategory);
  const { CategoryName } = getValidationRules();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const { isAdding, AddCategory } = useAddCategories();
  const { isUpdating, updateCategory } = useUpdateCategory();
  const currentName = watch("name");
  const isLoading = isAdding || isUpdating;
  const isInputEmpty =
    !currentName || currentName.trim() === currentCategory?.name;
  useEffect(() => {
    if (currentCategory) {
      setValue("name", currentCategory?.name);
    }
  }, [currentCategory, setValue]);
  const onSubmit = async (data) => {
    if (!isEditMode) {
      AddCategory(data, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else {
      updateCategory(
        { id: currentCategory.id, data },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  };
  return (
    <>
      <Modal show={show} onHide={closeModal} size="md" centered>
        <Modal.Header className="border-0 ">
          <Modal.Title className="fw-bold text-dark d-flex align-items-center gap-2">
            {`${isEditMode ? "Update" : "Add"} Category`}
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeModal}
          />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              error={errors.name}
              name={"name"}
              placeholder="Category Name"
              register={register}
              isSubmitting={isLoading}
              rules={CategoryName}
            />
            <ButtonFormInput
              cancel={closeModal}
              isLoading={isLoading}
              isEditMode={isEditMode}
              isInputEmpty={isInputEmpty}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
