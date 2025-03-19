import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('updates banner props on form submission', () => {
  const mockUpdateBanner = jest.fn();
  const { getByLabelText, getByText } = render(
    <Form onUpdateBanner={mockUpdateBanner} />
  );

  fireEvent.change(getByLabelText('Background Color:'), { target: { value: '#00ff00' } });
  fireEvent.change(getByLabelText('Banner Text:'), { target: { value: 'New Text' } });
  fireEvent.change(getByLabelText('Image URL:'), { target: { value: 'https://example.com/image.jpg' } });
  fireEvent.click(getByText('Update Banner'));

  expect(mockUpdateBanner).toHaveBeenCalledWith({
    backgroundColor: '#00ff00',
    text: 'New Text',
    imageUrl: 'https://example.com/image.jpg',
  });
});