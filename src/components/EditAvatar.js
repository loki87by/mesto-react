import React from 'react';

function EditAvatar() {
  return (
    <input type="url" placeholder="Ссылка на картинку" required className="popup__text popup__text_type_activity popup__text_type_avatar" id="link-input" name="link" />
    );
}
  
export default EditAvatar;