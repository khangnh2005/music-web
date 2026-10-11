// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector(
    "[upload-image-input]"
  );
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);

      uploadImagePreview.src = image;
    }
  });
}
// End Upload Image

// Upload Image
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector(
    "[upload-audio-input]"
  );
  const uploadAudioPreview = uploadAudio.querySelector(
    "[upload-image-preview]"
  );

  uploadAudioInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const audio = URL.createObjectURL(e.target.files[0]);

      uploadAudioPreview.src = audio;
    }
  });
}
// End Upload Image
