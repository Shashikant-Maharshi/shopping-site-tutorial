import { ChangeEvent, useState, useEffect } from 'react';
import Modal from 'shared/components/Modal/Modal';
import { Product } from 'shared/types/product';
import "./product-form.scss";

type FormFieldEvent = ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

type Props = {
  product: Product;
  onSubmit: (product: Product) => void;
  onClose: Function;
  processingForm: boolean;
};

const ProductForm = ({
  product,
  onSubmit,
  onClose,
  processingForm,
}: Props) => {
  const [form, setForm] = useState(() => product);
  const isNew = !product.id;
  const handleFormChange = (field: string, event: FormFieldEvent) => {
    const newForm = {
      ...form,
      [field]: event.target.value,
    } as Product;
    console.log(newForm);
    
    setForm(newForm);
  }

  useEffect(() => {
    setForm(product);
  }, [product]);

  return (
    <Modal
      className="product-form"
      show
      onClose={onClose}
    >
      <Modal.Header title={`${isNew ? 'Create' : 'Edit'} Product`} />
      <Modal.Content>
        <form>
          <label>
            <span>Name:</span>
            <input 
              value={form?.description} 
              onChange={(event: FormFieldEvent) => handleFormChange('name', event)} 
              required
            />
          </label>
          <label>
            <span>Description:</span>
            <textarea 
              value={form?.description} 
              onChange={(event: FormFieldEvent) => handleFormChange('description', event)} 
              required
            />
          </label>
          <label>
            <span>Price:</span>
            <input 
              type="number"
              value={form?.price} 
              onChange={(event: FormFieldEvent) => handleFormChange('price', event)} 
              required
            />
          </label>
          <label>
            <span>Discount:</span>
            <input 
              type="number"
              value={form?.discount} 
              onChange={(event: FormFieldEvent) => handleFormChange('discount', event)} 
              required
            />
          </label>
        </form>
      </Modal.Content>
      <Modal.Footer>
        {processingForm ? (
          <i>Saving form data...</i>
        ) : (
          <button onClick={() => onSubmit(form as Product)}>
            {isNew ? 'Submit' : 'Update'}
          </button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ProductForm;
