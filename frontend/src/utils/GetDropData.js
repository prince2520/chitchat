export const getDropData = (file) => {
  let data, name, size, type, location, fileData;

  name = file.name;
  size = file.size / (1000 * 1000);
  type = file.type.split("/")[0];
  fileData = file;

  location = URL.createObjectURL(file);

  data = {
    name: name,
    size: size,
    type: type,
    location: location,
    fileData: fileData,
  };

  return data;
};
