export const uploadFile = async (file: File) => {
  const type = file.type.split('/')[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'xh9cf50h');
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/drwm3i3g4/${type}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const convertFileSize = (size: number) => {
  return size / (1024 * 1024); // byte -> kb -> mb
};

export const convertFile = (file: File): any => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const media_type = file.type.split('/')[0];
    const url = reader.result as string;
    return { media_type, url };
  };
};
