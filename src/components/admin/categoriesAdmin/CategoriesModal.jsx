import React, {useState, useEffect} from 'react'
import Modal from '../../shared/modal/Modal'
import Button from '../../shared/button/Button';
import { createCategory, updateCategory } from '../../../service/CategoryService';
import {
  validateAlphabet,
  validateMinLength,
  validateNotEmpty,
} from "../../../utility/validation";

const CategoriesModal = ({title, isModalOpen, handleCloseModal, handleAddCategory, selectedCategory, setToastMessage, setToastType, setShowToast, setLoading}) => {

const [categoryData, setCategoryData] = useState({
  name: "",
})
const [errors, setErrors] = useState({
  name: ""
});

useEffect(()=> {
  if(!isModalOpen){
    setCategoryData({
      name: ''
    })
  }
}, [isModalOpen])

useEffect(() => {
  if (selectedCategory) {
    setCategoryData({
      name: selectedCategory.name
    });
  } else {
    setCategoryData({
      name: ""
    });
  }
  setErrors({
    name: '',
  })
}, [selectedCategory]);

const validateCategory = () => {

  categoryData.name = categoryData?.name?.trim();

  let isValid = true;
  const newErrors = { name: '' }

  if (!validateNotEmpty(categoryData?.name)) {
      newErrors.name = `Category name can't be empty`;
      isValid = false;
  } else if (!validateMinLength(categoryData.name, 3)) {
      newErrors.name = `Category name should have atleast 3 characters!`
      isValid = false;
  } else if (!validateAlphabet(categoryData.name)) {
      newErrors.name = `Special characters/numbers are not alowed!`
      isValid = false;
  }

  if (!isValid) {
      setErrors(newErrors);
  }

  return isValid;
}

const handleChange = (e) => {
  const { id, value } = e.target;
  setErrors({ ...errors, [e.target.id]: '' });
  setCategoryData((prevData) => ({
    ...prevData,
    [id]: value
  }));
};

const handleAdd = async () => {
  if (validateCategory()){
  try {
    setLoading(true)
    const data = await createCategory(categoryData);
    setToastMessage(data?.message || "Category added successfully!");
    setShowToast(true);
    setToastType("success");
    handleAddCategory();
    handleCloseModal();
  } catch (error) {
    setToastMessage(error?.message || "Failed to create category.");
    setToastType("error");
    setShowToast(true);
    setLoading(false)
  } finally {
    
    setLoading(false)
    setCategoryData({
      name: ""
    });
  }
}
}
const handleEdit = async () => {
  if(validateCategory()){
  try {
    setLoading(true)
    const data = await updateCategory(categoryData, selectedCategory?.id);
    setToastMessage(data?.message || "Category updated successfully!");
    setShowToast(true);
    setToastType("success");
    handleAddCategory();
  } catch (error) {
    setToastMessage(error?.message || "Error in updating category!");
    setShowToast(true);
    setToastType("error");
    setLoading(false)
  } finally {
    handleCloseModal();
    setLoading(false)
  }
}
}

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        <div>
          <div className="form-group">
            <label htmlFor="title" className="label-text" style={{ marginBottom: "5px" }}>Category Name:</label>
            <div>
            <input className="login-input" type="text" id="name" value={categoryData.name} onChange={handleChange} required />
            {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
          </div>
          <div className="modal-button">
          {!selectedCategory && <Button onClick={handleAdd} type='submit' text={'Add'} />}
          {selectedCategory && <Button onClick={handleEdit} type='submit' text={'Save'} />}
          </div>
          </div>
      </Modal>
  )
}

export default CategoriesModal